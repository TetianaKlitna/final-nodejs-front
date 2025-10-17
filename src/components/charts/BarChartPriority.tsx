import { useMemo } from 'react'
import { BarChart } from '@mui/x-charts/BarChart'
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { TaskDTO } from '../../types'
import { PRIORITY } from '../../constants/Priority'

type BarChartPriorityProps = {
  tasks: TaskDTO[]
}

const BarChartPriority = ({ tasks }: BarChartPriorityProps) => {
  const theme = useTheme()
  const { lowCount, mediumCount, highCount } = useMemo(() => {
    let low = 0,
      med = 0,
      high = 0
    for (const t of tasks) {
      if (t.priority === PRIORITY.LOW) low++
      else if (t.priority === PRIORITY.MEDIUM) med++
      else if (t.priority === PRIORITY.HIGH) high++
    }
    return { lowCount: low, mediumCount: med, highCount: high }
  }, [tasks])

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Task Priorities
      </Typography>

      <BarChart
        xAxis={[{ scaleType: 'band', data: [''] }]}
        series={[
          {
            label: PRIORITY.LOW,
            data: [lowCount],
            color: theme.palette.success.main
          },
          {
            label: PRIORITY.MEDIUM,
            data: [mediumCount],
            color: theme.palette.warning.main
          },
          {
            label: PRIORITY.HIGH,
            data: [highCount],
            color: theme.palette.error.main
          }
        ]}
        height={200}
      />
    </>
  )
}

export default BarChartPriority
