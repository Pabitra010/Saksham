import React from 'react'

type AlertType = 'Urgent' | 'Warning' | 'Info';

interface Alert {
    type: AlertType;
    message: string;
    time: string;
}

const alerts: Alert[] = [
    {
        type: 'Urgent',
        message: 'Cyclone warning issued for coastal regions - Evacuation procedures activated',
        time: '10 mins ago'
    },
    {
        type: 'Warning',
        message: 'Earthquake drill scheduled for all educational institutions on Friday',
        time: '2 hours ago'
    },
    {
        type: 'Info',
        message: 'New flood preparedness module available in Classroom section',
        time: '1 day ago'
    }
];

const getAlertColor = (type: AlertType): string => {
    const colors = {
        Urgent: 'bg-red-500',
        Warning: 'bg-yellow-500',
        Info: 'bg-green-500'
    };
    return colors[type];
};

const AlertsPage = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center py-16 px-4 bg-[#F1F7FE]'>
            <div className='mb-12'>
                <h1 className='text-4xl font-bold text-[#1A5276]'>Live Alerts & Update</h1>
            </div>
            <div className='flex flex-col gap-4 min-w-[70%]'>
                {alerts.map((alert, index) => (
                    <div 
                        key={index}
                        className='flex justify-between items-center bg-[#F8F9FA] p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300'
                    >
                        <h1 className={`${getAlertColor(alert.type)} rounded-full px-4 py-1 text-white font-bold min-w-[100px] text-center`}>
                            {alert.type}
                        </h1>
                        <h2 className='flex-1 mx-8 text-center'>{alert.message}</h2>
                        <p className='text-gray-700 whitespace-nowrap min-w-[100px] text-right'>{alert.time}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AlertsPage
