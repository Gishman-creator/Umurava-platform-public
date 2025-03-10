'use client'
import { AdminMetricCard } from '@/components/Components'
import { FileText, Users } from 'lucide-react'
import React from 'react'

function MetricCardContainer() {
  return (
    <div className='w-full grid grid-cols-6 gap-6'>
        <AdminMetricCard className='col-span-6 sm:col-span-3' title="Total Challenges" amount={29405} rate={15} defaultTime='This Week' icon={FileText} />
        <AdminMetricCard className='col-span-6 sm:col-span-3' title="Total Participants" amount={29405} rate={15} defaultTime='This Week' icon={Users} />
        <AdminMetricCard className='col-span-6 sm:col-span-3 lg:col-span-2' title="Completed Challenges" amount={5837} rate={15} defaultTime='Last 30 Days' icon={FileText} />
        <AdminMetricCard className='col-span-6 sm:col-span-3 lg:col-span-2' title="Open Challenges" amount={5837} rate={15} defaultTime='Last 30 Days' icon={FileText} />
        <AdminMetricCard className='col-span-6 sm:col-span-6 lg:col-span-2' title="Ongoing Challenges" amount={5837} rate={15} defaultTime='Last 30 Days' icon={FileText} />
    </div>
  )
}

export default MetricCardContainer