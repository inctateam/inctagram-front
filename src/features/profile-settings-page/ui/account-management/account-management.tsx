'use client'
import { useState } from 'react'

import { PaypalLogo, StripeLogo } from '@/assets/icons'
import { Card, Typography } from '@/shared/ui'
import RoundedCheckbox from '@/shared/ui/checkbox/rounded-checkbox'

enum Option {
  BUSINESS = 'Business',
  PERSONAL = 'Personal',
}

enum Costs {
  PERDAY = '$10 per Day',
  PERMONTH = '$100 per month',
  PERWEEK = '$50 per7 Days',
}
const AccountManagement = () => {
  const [selectedOption, setSelectedOption] = useState(Option.PERSONAL)
  const [selectedCosts, setSelectedCosts] = useState(Costs.PERDAY)

  return (
    <>
      <Typography className={'mt-7 mb-1.5'} variant={'bold16'}>
        Account type:
      </Typography>
      <Card className={'flex flex-col gap-7 pt-4 pb-4 pl-6 mb-11'}>
        <RoundedCheckbox
          checked={selectedOption === Option.PERSONAL}
          label={Option.PERSONAL}
          onChange={checked => checked && setSelectedOption(Option.PERSONAL)}
        />
        <RoundedCheckbox
          checked={selectedOption === Option.BUSINESS}
          label={Option.BUSINESS}
          onChange={checked => checked && setSelectedOption(Option.BUSINESS)}
        />
      </Card>
      {selectedOption === Option.BUSINESS && (
        <>
          <Typography className={'mt-7 mb-1.5'} variant={'bold16'}>
            Your subscription costs:
          </Typography>
          <Card className={'flex flex-col gap-7 pt-4 pb-4 pl-6'}>
            <RoundedCheckbox
              checked={selectedCosts === Costs.PERDAY}
              label={Costs.PERDAY}
              onChange={checked => checked && setSelectedCosts(Costs.PERDAY)}
            />
            <RoundedCheckbox
              checked={selectedCosts === Costs.PERWEEK}
              label={Costs.PERWEEK}
              onChange={checked => checked && setSelectedCosts(Costs.PERWEEK)}
            />
            <RoundedCheckbox
              checked={selectedCosts === Costs.PERMONTH}
              label={Costs.PERMONTH}
              onChange={checked => checked && setSelectedCosts(Costs.PERMONTH)}
            />
          </Card>
          <div className={'flex justify-end items-center gap-14'}>
            <PaypalLogo className={'w-24 h-16 mt-6'} />
            <Typography>Or</Typography>
            <StripeLogo className={'w-24 h-16 mt-6 mr-[-16px]'} />
          </div>
        </>
      )}
    </>
  )
}

export default AccountManagement
