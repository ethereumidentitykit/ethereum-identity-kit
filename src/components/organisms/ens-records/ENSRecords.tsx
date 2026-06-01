import React from 'react'
import { ENSRecordsRoot } from './ENSRecordsContext'
import { ENSRecordsLoading, ENSRecordsEmpty, ENSRecordsContent, ENSRecordsShell } from './slots'
import type { ENSRecordsProps } from './ENSRecords.types'
import './ENSRecords.css'

const ENSRecordsBase: React.FC<ENSRecordsProps> = (props) => (
  <ENSRecordsRoot {...props}>
    <ENSRecordsLoading />
    <ENSRecordsEmpty />
    <ENSRecordsContent />
  </ENSRecordsRoot>
)

const ENSRecords = Object.assign(ENSRecordsBase, {
  Root: ENSRecordsRoot,
  Loading: ENSRecordsLoading,
  Empty: ENSRecordsEmpty,
  Content: ENSRecordsContent,
  Shell: ENSRecordsShell,
})

export default ENSRecords

export { ENSRecordsRoot, ENSRecordsLoading, ENSRecordsEmpty, ENSRecordsContent, ENSRecordsShell }
