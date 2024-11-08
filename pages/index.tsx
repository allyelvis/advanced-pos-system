import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import POSSystem from '../components/POSSystem'
import AccountingDashboard from '../components/AccountingDashboard'
import VehicleManagement from '../components/VehicleManagement'
import CRM from '../components/CRM'
import ServiceManagement from '../components/ServiceManagement'
import Login from '../components/Login'

export default function Home() {
  const [activeComponent, setActiveComponent] = useState('pos')
  const [user, setUser] = useState<any>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (token: string, user: any) => {
    setToken(token)
    setUser(user)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const handleLogout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  if (!token || !user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="container mx-auto p-4">
      <nav className="flex flex-wrap gap-4 mb-4 items-center">
        <Button onClick={() => setActiveComponent('pos')}>POS System</Button>
        <Button onClick={() => setActiveComponent('accounting')}>Accounting</Button>
        <Button onClick={() => setActiveComponent('vehicles')}>Vehicle Management</Button>
        <Button onClick={() => setActiveComponent('crm')}>CRM</Button>
        <Button onClick={() => setActiveComponent('service')}>Service Management</Button>
        <span className="ml-auto">Welcome, {user.username}</span>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </nav>
      {activeComponent === 'pos' && <POSSystem />}
      {activeComponent === 'accounting' && <AccountingDashboard />}
      {activeComponent === 'vehicles' && <VehicleManagement />}
      {activeComponent === 'crm' && <CRM />}
      {activeComponent === 'service' && <ServiceManagement />}
    </div>
  )
}
