import { Users } from "lucide-react";

interface HowItWorksProps {
  header: string
  description: string
}

export function HowItWorks({ header, description }: HowItWorksProps) {
  return (
    <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
      <div className="bg-blue-100 rounded-2xl p-6 inline-block mb-6 group-hover:bg-blue-200 transition-colors">
        <Users className="w-12 h-12 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{header}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}