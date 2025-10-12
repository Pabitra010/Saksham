import { log } from 'console'
import {supabase} from '../../utils/supabase/client'

export type AlertDataRow = {
    id: string,
    severity_type: string,
    title: string,
    description: string,
    report_time: string,
    location: string,
}

export const getAlertsData = async (): Promise<AlertDataRow[]> => {
    const { data, error } = await supabase
        .from('alert')
        .select('*')
        .order('report_time', { ascending: false })

    console.log('====================================');
    console.log(data);
    console.log('====================================');
    if (error) {
        console.error('Error fetching alerts:', error)
        return []
    }

    return data as AlertDataRow[]
}