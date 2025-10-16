'use client'

import React, { useEffect, useState } from 'react'
import { getAlertsData, type AlertDataRow } from '../../auth/getAlertsData'

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<AlertDataRow[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [availableLocations, setAvailableLocations] = useState<string[]>([])

  useEffect(() => {
    // Load saved location from localStorage on component mount
    const savedLocation = localStorage.getItem('userLocation')
    if (savedLocation) {
      setSelectedLocation(savedLocation)
    }
  }, [])

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getAlertsData()
      .then(rows => {
        if (!mounted) return
  // alerts data received (debug)
        setAlerts(rows)
        
        // Extract unique city names (first word before comma)
        const cities = [...new Set(
          rows
            .map(alert => alert.location?.split(',')[0]?.trim())
            .filter(Boolean)
        )]
        setAvailableLocations(cities)
      })
      .catch(err => console.error('Error fetching alerts', err))
      .finally(() => setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location)
    // Save to localStorage for persistence
    if (location) {
      localStorage.setItem('userLocation', location)
    } else {
      localStorage.removeItem('userLocation')
    }
  }

  // Filter alerts by selected location (match first word of location)
  const filteredAlerts = selectedLocation 
    ? alerts.filter(alert => {
        if (!alert.location) return false
        const firstWord = alert.location.split(',')[0].trim().toLowerCase()
        const searchTerm = selectedLocation.trim().toLowerCase()
        return firstWord.includes(searchTerm) || searchTerm.includes(firstWord)
      })
    : alerts

  // group and sort
  const grouped: Record<string, AlertDataRow[]> = { urgent: [], warning: [], info: [] }
  filteredAlerts.forEach(a => {
    const severityType = (a.severity_type || 'info').toLowerCase()
    let key: string
    
    // Map severity types to display categories
    if (severityType === 'extreme' || severityType === 'severe') {
      key = 'urgent'
    } else if (severityType === 'moderate') {
      key = 'warning'
    } else {
      key = 'info' // 'low' and others go to info
    }
    
    grouped[key].push(a)
  })
  // sort each group by report_time desc (newest first)
  Object.values(grouped).forEach(arr => arr.sort((x, y) => (new Date(y.report_time).getTime() - new Date(x.report_time).getTime())))
  
  // Debug logging
  // grouped alerts computed (debug)

  const timeAgo = (iso: string) => {
    try {
      const diff = Date.now() - new Date(iso).getTime()
      const mins = Math.floor(diff / 60000)
      if (mins < 1) return 'just now'
      if (mins < 60) return `${mins}m ago`
      const hrs = Math.floor(mins / 60)
      if (hrs < 24) return `${hrs}h ago`
      const days = Math.floor(hrs / 24)
      return `${days}d ago`
    } catch {
      return ''
    }
  }

  const AlertType = {
    urgent: {
      bg: 'bg-red-100',
      border: 'border-red-500',
      text: 'text-red-700',
    },
    warning: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-500',
      text: 'text-yellow-700',
    },
    info: {
      bg: 'bg-blue-100',
      border: 'border-blue-500',
      text: 'text-blue-700',
    },
  }
  return (
    <div className='mt-16 min-h-screen bg-gray-50'>
    <div className='container mx-auto px-2 sm:px-4 lg:px-6'>
      <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#174869] py-3 text-center md:text-left'>Alerts</h1>
      
      {/* Location Filter Input */}
      <div className='py-2 mb-4'>
        <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3'>
          <label htmlFor="location-input" className='text-base sm:text-lg font-semibold text-[#174869] whitespace-nowrap'>
            Your Location:
          </label>
          <div className='flex-1'>
            <input
              id="location-input"
              type="text"
              value={selectedLocation}
              onChange={(e) => handleLocationChange(e.target.value)}
              placeholder="Enter your location or leave empty for all locations"
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
            />
          </div>
        </div>
        {selectedLocation && (
          <div className='mt-2'>
            <span className='text-sm text-gray-600'>
              Showing alerts for: <strong>{selectedLocation}</strong>
            </span>
          </div>
        )}
        {availableLocations.length > 0 && (
          <div className='mt-2'>
            <p className='text-sm text-gray-500 mb-1'>Available locations:</p>
            
            {/* Mobile Dropdown */}
            <div className='block md:hidden'>
              <select
                value=""
                onChange={(e) => {
                  if (e.target.value) {
                    handleLocationChange(e.target.value)
                  }
                }}
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white'
              >
                <option value="">Select a location...</option>
                {availableLocations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop Buttons */}
            <div className='hidden md:flex flex-wrap gap-2'>
              {availableLocations.map(location => (
                <button
                  key={location}
                  onClick={() => handleLocationChange(location)}
                  className='px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-md transition-colors cursor-pointer'
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>

      <div className='flex flex-col lg:flex-row gap-4 py-2'>
        {/* Urgent Alert Column */}
        <div className={`flex-1 border-l-4 p-3 sm:p-4 max-h-80 sm:max-h-96 overflow-y-auto rounded-r-lg shadow-sm ${AlertType.urgent.bg} ${AlertType.urgent.border}`}>
          <p className={`font-bold text-sm sm:text-base ${AlertType.urgent.text} mb-2`}>Urgent</p>
          {loading ? (
            <div className='flex justify-center py-4'>
              <p className='text-sm'>Loading...</p>
            </div>
          ) : grouped.urgent.length === 0 ? (
            <p className={`text-sm ${AlertType.urgent.text}`}>No urgent alerts</p>
          ) : grouped.urgent.map(a => {
            const isExpanded = !!expanded[a.id]
            return (
              <div key={a.id} className='mb-2 sm:mb-3 p-2 sm:p-3 bg-white rounded shadow-sm'>
                <div className='flex justify-between items-start gap-2'>
                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
                      <h3 className='font-semibold text-sm sm:text-base truncate'>{a.title}</h3>
                      <span className='px-2 py-0.5 text-xs bg-red-200 text-red-800 rounded w-fit'>{timeAgo(a.report_time)}</span>
                    </div>
                    <p className='text-xs text-gray-500 mt-1 truncate'>{a.location}</p>
                  </div>
                  <div className='flex-shrink-0'>
                    <button 
                      onClick={() => setExpanded(prev => ({ ...prev, [a.id]: !prev[a.id] }))} 
                      className='text-xs sm:text-sm text-blue-600 hover:text-blue-800 px-1'
                    >
                      {isExpanded ? 'Less' : 'More'}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div className='mt-2 text-xs sm:text-sm text-gray-700 break-words'>
                    {a.description}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Warning Alert Column */}
        <div className={`flex-1 border-l-4 p-3 sm:p-4 max-h-80 sm:max-h-96 overflow-y-auto rounded-r-lg shadow-sm ${AlertType.warning.bg} ${AlertType.warning.border}`}>
          <p className={`font-bold text-sm sm:text-base ${AlertType.warning.text} mb-2`}>Warning</p>
          {loading ? (
            <div className='flex justify-center py-4'>
              <p className='text-sm'>Loading...</p>
            </div>
          ) : grouped.warning.length === 0 ? (
            <p className={`text-sm ${AlertType.warning.text}`}>No warnings</p>
          ) : grouped.warning.map(a => {
            const isExpanded = !!expanded[a.id]
            return (
              <div key={a.id} className='mb-2 sm:mb-3 p-2 sm:p-3 bg-white rounded shadow-sm'>
                <div className='flex justify-between items-start gap-2'>
                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
                      <h3 className='font-semibold text-sm sm:text-base truncate'>{a.title}</h3>
                      <span className='px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded w-fit'>{timeAgo(a.report_time)}</span>
                    </div>
                    <p className='text-xs text-gray-500 mt-1 truncate'>{a.location}</p>
                  </div>
                  <div className='flex-shrink-0'>
                    <button 
                      onClick={() => setExpanded(prev => ({ ...prev, [a.id]: !prev[a.id] }))} 
                      className='text-xs sm:text-sm text-blue-600 hover:text-blue-800 px-1'
                    >
                      {isExpanded ? 'Less' : 'More'}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div className='mt-2 text-xs sm:text-sm text-gray-700 break-words'>
                    {a.description}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Info Alert Column */}
        <div className={`flex-1 border-l-4 p-3 sm:p-4 max-h-80 sm:max-h-96 overflow-y-auto rounded-r-lg shadow-sm ${AlertType.info.bg} ${AlertType.info.border}`}>
          <p className={`font-bold text-sm sm:text-base ${AlertType.info.text} mb-2`}>Info</p>
          {loading ? (
            <div className='flex justify-center py-4'>
              <p className='text-sm'>Loading...</p>
            </div>
          ) : grouped.info.length === 0 ? (
            <p className={`text-sm ${AlertType.info.text}`}>No info alerts</p>
          ) : grouped.info.map(a => {
            const isExpanded = !!expanded[a.id]
            return (
              <div key={a.id} className='mb-2 sm:mb-3 p-2 sm:p-3 bg-white rounded shadow-sm'>
                <div className='flex justify-between items-start gap-2'>
                  <div className='flex-1 min-w-0'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2'>
                      <h3 className='font-semibold text-sm sm:text-base truncate'>{a.title}</h3>
                      <span className='px-2 py-0.5 text-xs bg-blue-200 text-blue-800 rounded w-fit'>{timeAgo(a.report_time)}</span>
                    </div>
                    <p className='text-xs text-gray-500 mt-1 truncate'>{a.location}</p>
                  </div>
                  <div className='flex-shrink-0'>
                    <button 
                      onClick={() => setExpanded(prev => ({ ...prev, [a.id]: !prev[a.id] }))} 
                      className='text-xs sm:text-sm text-blue-600 hover:text-blue-800 px-1'
                    >
                      {isExpanded ? 'Less' : 'More'}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div className='mt-2 text-xs sm:text-sm text-gray-700 break-words'>
                    {a.description}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AlertsPage
