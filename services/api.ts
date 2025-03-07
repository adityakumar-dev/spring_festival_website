import { Console } from "console";
import { METHODS } from "http";
import { useState } from "react";
import axios from 'axios';
export const API_BASE_URL = 'https://api.vmsbutu.it.com'
export const url = API_BASE_URL;
export interface RegisterData {
  name: string
  email: string
  userType: 'individual' | 'instructor' | 'student'
  institutionName?: string
  institution_id?: string
  instructor_id?: string
  groupSize?: number
  photo: File
  unique_id_type: string  // This should be one of: "aadhar", "pan", "driving_license", "passport", "voter_id"
  unique_id: string
}
interface CreateAppUser {
  admin_name: string,
  admin_password: string,
  user_name: string,
  user_password: string,
  user_email: string,
  unique_id_type: string,
  unique_id: string,
  profile_picture: File,
}
interface RegisterGroupData {
  name: string;

  group_size: number;
}
// export interface CreateAppUser extends RegisterData{
export const api = {


  async registerGroup(data: RegisterGroupData) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("count", data.group_size.toString());
    try{

    
    const response = await fetch(`${API_BASE_URL}/institutions`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      console.log(response.status)
      // throw new Error('Failed to register group')
      alert("Failed to register group")
      return false
    }
    else{
      alert("Group registered successfully")
      return response.json()
    }
    }
    catch(error){
      console.error('Error in registerGroup:', error)
      alert("Failed to register group")
      return false
    }
  },
  latest_visitor_card: "",
  base: (card : string) => `${API_BASE_URL}/users/download-visitor-card/?card_path=${encodeURIComponent(card)}`,
  async createAppUser(data: CreateAppUser) {
    try {
      const formData = new FormData()
      formData.append('admin_name', data.admin_name)
      formData.append('admin_password', data.admin_password)
      formData.append('user_name', data.user_name)
      formData.append('user_password', data.user_password)
      formData.append('user_email', data.user_email)
      formData.append('unique_id_type', data.unique_id_type)
      formData.append('unique_id', data.unique_id)
      formData.append('profile_picture', data.profile_picture)

      console.log('Sending request to:', `${API_BASE_URL}/app_users/create`)
      console.log('Request data:', Object.fromEntries(formData.entries()))

      const response = await fetch(`${API_BASE_URL}/app_users/create`, { 
        method: 'POST', 
        body: formData,
        headers: {
          'Accept': 'application/json',
      
        }
      })

      console.log('Response status:', response.status)
      const responseText = await response.text()
      console.log('Response body:', responseText)
      console.log("Respnse json : ", JSON.parse(responseText))

      if (response.ok) {
        const responseResult = JSON.parse(responseText)
        if (responseResult['status']) {
          return true
        } else {
          throw new Error(responseResult['message'] || 'Unknown error occurred')
        }
      } else {
        console.error('Server returned error status:', response.status)
        return false
      }
    } catch (error) {
      console.error('Error in createAppUser:', error)
      return false
    }
  },

  async verifyAdmin(username: string, password: string) {
    const formData = new FormData()
    formData.append('admin_name', username)
    formData.append('admin_password', password)
    const response = await fetch(`${API_BASE_URL}/app_users/check/admin`, { method: 'POST', body: formData })
    if (response.ok) {
      const result = await response.json()
      console.log(result)
      return result['status']
    } else {
      return false;
    }
  }
  ,
  async validateEmail(email: string) {
    const response = await fetch(`${API_BASE_URL}/users/check/email/${email}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
    })
    console.log(response);
    if (!response.ok) {
      console.log(response.status)
      throw new Error(`Failed to validate email`)
    }else{
      return response.json()
    }
  },
  // Get all institutions
  async getInstitutions() {
    console.log("Fetching institutions");
    const response = await fetch(`${API_BASE_URL}/institutions`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
       
      },
    })
    console.log(response);
    if (!response.ok) {
      console.log(response.status)
      throw new Error('Failed to fetch institutions')
    }
    return response.json()
  },
  async validateAadhar(aadharNumber: string) {
    try {
      const formData = new FormData()
      formData.append('aadhar_number', aadharNumber)
      const response = await fetch(`${API_BASE_URL}/users/check/aadhar`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      })
      if (!response.ok) {
        console.log(response.status)
        throw new Error(`Failed to validate Aadhar`)
      }
      return await response.json()
    } catch (error) {
      console.error('Aadhar validation error:', error)
      throw error
    }
  },
  async register(data: RegisterData) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("user_type", data.userType);
    formData.append("image", data.photo);
    formData.append("unique_id_type", data.unique_id_type);
    formData.append("unique_id", data.unique_id);
    formData.append("is_quick_register", "false");
  
    if (data.institution_id ) {
      formData.append("institution_id", data.institution_id);
    }
  
    try {
      console.log("Sending registration request to:", `${API_BASE_URL}/users/create/`);
      const response = await axios.post(`${API_BASE_URL}/users/create/`, formData);
  
      // Directly use response.data since Axios automatically parses JSON responses
      const result = response.data;
  
      console.log("Registration response:", result);
  
      if (response.status === 200) {
        alert("Registration successful");
  
        if (!result.visitor_card_path) {
          console.error("No visitor_card_path found in response.");
          return result;
        }
  
        let normalizedCardPath = result.visitor_card_path.replace(/\\/g, "/");
        this.latest_visitor_card = normalizedCardPath;
        // Construct the download URL
        const downloadUrl = `${API_BASE_URL}/users/download-visitor-card/?card_path=${encodeURIComponent(normalizedCardPath)}`;
  
        try {
          console.log("Initiating visitor card download from:", downloadUrl);
          
          // Create a temporary link element
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.target = '_blank'; // Optional: opens in new tab
          
          // Trigger the download
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          return result;
        } catch (downloadError) {
          console.error("Error downloading visitor card:", downloadError);
          alert("Error downloading visitor card");
        }
  
        return result;
      } else {
        throw new Error(result.message || "Registration failed! Please switch to Chrome browser.");
      }
    } catch (error) {
      alert("Registration failed! Please switch to Chrome browser.");
      console.error("Registration request failed:", error);
      throw error;
    }
  }
  
  }