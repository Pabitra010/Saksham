"use client"
import React, { useEffect, useState } from 'react'
import { getAlertsData, type AlertDataRow } from '../app/auth/getAlertsData'

type AlertType = 'Urgent' | 'Warning' | 'Info';

interface Alert {
    type: AlertType;
    title: string;
    description: string;
    time: string;
}

const getAlertColor = (type: AlertType): string => {
    const colors = {
        Urgent: 'bg-red-500',
        Warning: 'bg-yellow-500',
        Info: 'bg-green-500'
    };
    return colors[type];
};

const AlertsPage = () => {
    const [alerts, setAlerts] = useState<Alert[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchAndProcessAlerts = async () => {
            try {
                const data = await getAlertsData()
                const processedAlerts = processAlertsData(data)
                setAlerts(processedAlerts)
            } catch (error) {
                console.error('Error fetching alerts:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchAndProcessAlerts()
    }, [])

    const processAlertsData = (data: AlertDataRow[]): Alert[] => {
        // Group alerts by severity type
        const grouped: Record<string, AlertDataRow[]> = { urgent: [], warning: [], info: [] }
        
        data.forEach(alert => {
            const severityType = (alert.severity_type || 'info').toLowerCase()
            let key: string
            
            if (severityType === 'extreme' || severityType === 'severe') {
                key = 'urgent'
            } else if (severityType === 'moderate') {
                key = 'warning'
            } else {
                key = 'info'
            }
            
            grouped[key].push(alert)
        })

        // Get the most recent alert from each category
        const result: Alert[] = []
        
        if (grouped.urgent.length > 0) {
            const latest = grouped.urgent.sort((a, b) => new Date(b.report_time).getTime() - new Date(a.report_time).getTime())[0]
            result.push({
                type: 'Urgent',
                title: latest.title,
                description: latest.description,
                time: timeAgo(latest.report_time)
            })
        }
        
        if (grouped.warning.length > 0) {
            const latest = grouped.warning.sort((a, b) => new Date(b.report_time).getTime() - new Date(a.report_time).getTime())[0]
            result.push({
                type: 'Warning',
                title: latest.title,
                description: latest.description,
                time: timeAgo(latest.report_time)
            })
        }
        
        if (grouped.info.length > 0) {
            const latest = grouped.info.sort((a, b) => new Date(b.report_time).getTime() - new Date(a.report_time).getTime())[0]
            result.push({
                type: 'Info',
                title: latest.title,
                description: latest.description,
                time: timeAgo(latest.report_time)
            })
        }

        return result
    }

    const timeAgo = (iso: string): string => {
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
            return 'unknown'
        }
    }

    if (loading) {
        return (
            <div className='w-full flex flex-col justify-center items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#F1F7FE]'>
                <div className='mb-8 sm:mb-10 md:mb-12 text-center'>
                    <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A5276]'>Live Alerts & Update</h1>
                </div>
                <div className='flex justify-center items-center min-h-[150px] sm:min-h-[200px]'>
                    <p className='text-base sm:text-lg text-gray-600'>Loading latest alerts...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full flex flex-col justify-center items-center py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-[#F1F7FE]'>
            <div className='mb-8 sm:mb-10 md:mb-12 text-center'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1A5276]'>Live Alerts & Update</h1>
            </div>
            <div className='flex flex-col gap-3 sm:gap-4 w-full max-w-6xl'>
                {alerts.length === 0 ? (
                    <div className='text-center py-6 sm:py-8'>
                        <p className='text-base sm:text-lg text-gray-600'>No recent alerts available</p>
                    </div>
                ) : alerts.map((alert, index) => (
                    <div 
                        key={index}
                        className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 bg-[#F8F9FA] p-3 sm:p-4 md:p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300'
                    >
                        <div className='flex items-center justify-between sm:block'>
                            <h1 className={`${getAlertColor(alert.type)} rounded-full px-3 sm:px-4 py-1 text-white font-bold text-xs sm:text-sm md:text-base text-center whitespace-nowrap`}>
                                {alert.type}
                            </h1>
                            <p className='text-gray-700 text-xs sm:text-sm md:text-base sm:hidden'>{alert.time}</p>
                        </div>
                        <div className='flex-1 sm:mx-4 md:mx-6 lg:mx-8'>
                            <h2 className='text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-1 sm:mb-2'>{alert.title}</h2>
                            <p className='text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed'>{alert.description}</p>
                        </div>
                        <p className='text-gray-700 text-xs sm:text-sm md:text-base text-right hidden sm:block whitespace-nowrap'>{alert.time}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AlertsPage
