'use client'

import React, { useEffect, useState } from 'react'
import { getAlertsData, type AlertDataRow } from '../../auth/getAlertsData'

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<AlertDataRow[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  useEffect(() => {
    let mounted = true
    setLoading(true)
    getAlertsData()
      .then(rows => {
        if (!mounted) return
        setAlerts(rows)
      })
      .catch(err => console.error('Error fetching alerts', err))
      .finally(() => setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  // group and sort
  const grouped: Record<string, AlertDataRow[]> = { urgent: [], warning: [], info: [] }
  alerts.forEach(a => {
    const key = (a.severity_type || 'info').toLowerCase()
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(a)
  })
  // sort each group by report_time desc (newest first)
  Object.values(grouped).forEach(arr => arr.sort((x, y) => (new Date(y.report_time).getTime() - new Date(x.report_time).getTime())))

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
    <div className='mt-16'>
      <h1 className='text-4xl font-bold text-[#174869] px-4 py-3'>Alerts</h1>
      <div className='flex flex-col md:flex-row gap-4 px-4 py-2'>
        {/* Urgent Alert Column */}
        <div className={`flex-1 border-l-4 p-4 ${AlertType.urgent.bg} ${AlertType.urgent.border}`}>
          <p className={`font-bold ${AlertType.urgent.text} mb-2`}>Urgent</p>
          {loading ? <p>Loading...</p> : grouped.urgent.length === 0 ? <p className={AlertType.urgent.text}>No urgent alerts</p> : grouped.urgent.map(a => {
            const isExpanded = !!expanded[a.id]
            return (
              <div key={a.id} className='mb-3 p-3 bg-white rounded shadow'>
                <div className='flex justify-between items-start gap-2'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-semibold'>{a.title}</h3>
                      <span className='px-2 py-0.5 text-xs bg-red-200 text-red-800 rounded'>{timeAgo(a.report_time)}</span>
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>{a.location}</p>
                  </div>
                  <div>
                    <button onClick={() => setExpanded(prev => ({ ...prev, [a.id]: !prev[a.id] }))} className='text-sm text-blue-600'>
                      {isExpanded ? 'Collapse' : 'Details'}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div className='mt-2 text-sm text-gray-700'>
                    {a.description}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Warning Alert Column */}
        <div className={`flex-1 border-l-4 p-4 ${AlertType.warning.bg} ${AlertType.warning.border}`}>
          <p className={`font-bold ${AlertType.warning.text} mb-2`}>Warning</p>
          {loading ? <p>Loading...</p> : grouped.warning.length === 0 ? <p className={AlertType.warning.text}>No warnings</p> : grouped.warning.map(a => {
            const isExpanded = !!expanded[a.id]
            return (
              <div key={a.id} className='mb-3 p-3 bg-white rounded shadow'>
                <div className='flex justify-between items-start gap-2'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-semibold'>{a.title}</h3>
                      <span className='px-2 py-0.5 text-xs bg-yellow-200 text-yellow-800 rounded'>{timeAgo(a.report_time)}</span>
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>{a.location}</p>
                  </div>
                  <div>
                    <button onClick={() => setExpanded(prev => ({ ...prev, [a.id]: !prev[a.id] }))} className='text-sm text-blue-600'>
                      {isExpanded ? 'Collapse' : 'Details'}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div className='mt-2 text-sm text-gray-700'>
                    {a.description}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Info Alert Column */}
        <div className={`flex-1 border-l-4 p-4 ${AlertType.info.bg} ${AlertType.info.border}`}>
          <p className={`font-bold ${AlertType.info.text} mb-2`}>Info</p>
          {loading ? <p>Loading...</p> : grouped.info.length === 0 ? <p className={AlertType.info.text}>No info alerts</p> : grouped.info.map(a => {
            const isExpanded = !!expanded[a.id]
            return (
              <div key={a.id} className='mb-3 p-3 bg-white rounded shadow'>
                <div className='flex justify-between items-start gap-2'>
                  <div>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-semibold'>{a.title}</h3>
                      <span className='px-2 py-0.5 text-xs bg-blue-200 text-blue-800 rounded'>{timeAgo(a.report_time)}</span>
                    </div>
                    <p className='text-xs text-gray-500 mt-1'>{a.location}</p>
                  </div>
                  <div>
                    <button onClick={() => setExpanded(prev => ({ ...prev, [a.id]: !prev[a.id] }))} className='text-sm text-blue-600'>
                      {isExpanded ? 'Collapse' : 'Details'}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div className='mt-2 text-sm text-gray-700'>
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
