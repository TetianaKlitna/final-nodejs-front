import { useMemo } from 'react'
import type { TaskDTO } from '../../types'
import { grey, blue, green } from '@mui/material/colors'
import { STATUS } from '../../constants/Status'
import Typography from '@mui/material/Typography'
import { PieChart } from '@mui/x-charts/PieChart'

type PieChartStatusProps = {
  tasks: TaskDTO[]
}

const PieChartStatus = ({ tasks }: PieChartStatusProps) => {
  const { todoCount, progressCount, doneCount } = useMemo(() => {
    let todo = 0,
      prog = 0,
      done = 0
    for (const t of tasks) {
      if (t.status === STATUS.TODO) todo++
      else if (t.status === STATUS.IN_PROGRESS) prog++
      else if (t.status === STATUS.DONE) done++
    }
    return { todoCount: todo, progressCount: prog, doneCount: done }
  }, [tasks])

  return (
    <>
      <Typography variant='h6' gutterBottom>
        Task Status Overview
      </Typography>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: todoCount, label: STATUS.TODO, color: grey[500] },
              {
                id: 1,
                value: progressCount,
                label: STATUS.IN_PROGRESS,
                color: blue[800]
              },
              { id: 2, value: doneCount, label: STATUS.DONE, color: green[800] }
            ]
          }
        ]}
        height={200}
      />
    </>
  )
}

export default PieChartStatus
