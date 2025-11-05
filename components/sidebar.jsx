import { navigation } from "../constant" 
import { HelpCircle, Package, Settings, Plus, LogOut } from "lucide-react"
import Link from "next/link"
const SideBar = ({currentPath = "/dashboard"}) => {

  return (
    <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10">
      <div className="mb-12">
        <div className="flex items-center space-x-2 mb-4">
          <div>
            <HelpCircle className="w-7 h-7"/>
          </div>
          <span className="text-lg font-semibold">IT SUPPORT</span>
        </div>
      </div>

      <nav className="space-y-2.5">
        <div className="text-sm font-semibold text-gray-400 uppercase mb-4">
          Helpdesk
        </div>
        {navigation.map((item, key) => {
          const IconComponent = item.icon
          const isActive = currentPath === item.href;
          return (
            <Link href={item.href} key={key} className={`flex items-center space-x-3 py-2 px-3 rounded-lg ${isActive ? "bg-purple-100 text-gray-800": "hover:bg-gray-800 text-gray-300"}`}>
              <IconComponent className="w-5 h-5" />
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
        <div>
          <Link href="/sign-in" className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg hover:bg-gray-800 text-gray-300">
            <LogOut className="w-5 h-5" />
            Sign Out
          </Link>
        </div>
      </div>

    </div>
  )
}

export default SideBar
