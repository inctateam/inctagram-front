import { PaypalLogo, RadioButtonChecked, RadioButtonUnchecked, StripeLogo } from '@/assets/icons'
import { Card, Typography } from '@/shared/ui'
import { useState } from 'react'

enum Option {
  PERSONAL = 'Personal',
  BUSINESS = 'Business',
}

enum Costs {
  PERDAY = '$10 per Day',
  PERWEEK = '$50 per7 Days',
  PERMONTH = '$100 per month',
}
const AccountManagement = () => {
  const [selectedOption, setSelectedOption] = useState(Option.PERSONAL)
  const [selectedCosts, setSelectedCosts] = useState(Costs.PERDAY)
  const handleCheckboxClick = (option: Option) => {
    setSelectedOption(option)
  }
  const handleCostsClick = (costs: Costs) => {
    setSelectedCosts(costs)
  }
  return (
    <>
      <Typography variant={'bold16'} className="mt-7 mb-1.5">
        Account type:
      </Typography>
      <Card className="flex flex-col gap-7 pt-4 pb-4 pl-6 mb-11">
        <div
          onClick={() => handleCheckboxClick(Option.PERSONAL)}
          className={'flex items-center gap-4 cursor-pointer text-[14px]'}
        >
          {selectedOption === Option.PERSONAL ? (
            <RadioButtonChecked className="w-5 h-5" />
          ) : (
            <RadioButtonUnchecked className="w-5 h-5" />
          )}
          {Option.PERSONAL}
        </div>
        <div
          onClick={() => handleCheckboxClick(Option.BUSINESS)}
          className={'flex items-center gap-4 cursor-pointer  text-[14px]'}
        >
          {selectedOption === Option.BUSINESS ? (
            <RadioButtonChecked className="w-5 h-5" />
          ) : (
            <RadioButtonUnchecked className="w-5 h-5" />
          )}
          {Option.BUSINESS}
        </div>
      </Card>
      {selectedOption === Option.BUSINESS && (
        <>
          <Typography variant={'bold16'} className="mt-7 mb-1.5">
            Your subscription costs:
          </Typography>
          <Card className="flex flex-col gap-7 pt-4 pb-4 pl-6">
            <div
              onClick={() => handleCostsClick(Costs.PERDAY)}
              className={'flex items-center gap-4 cursor-pointer text-[14px]'}
            >
              {selectedCosts === Costs.PERDAY ? (
                <RadioButtonChecked className="w-5 h-5" />
              ) : (
                <RadioButtonUnchecked className="w-5 h-5" />
              )}
              {Costs.PERDAY}
            </div>
            <div
              onClick={() => handleCostsClick(Costs.PERWEEK)}
              className={'flex items-center gap-4 cursor-pointer text-[14px]'}
            >
              {selectedCosts === Costs.PERWEEK ? (
                <RadioButtonChecked className="w-5 h-5" />
              ) : (
                <RadioButtonUnchecked className="w-5 h-5" />
              )}
              {Costs.PERWEEK}
            </div>
            <div
              onClick={() => handleCostsClick(Costs.PERMONTH)}
              className={'flex items-center gap-4 cursor-pointer text-[14px]'}
            >
              {selectedCosts === Costs.PERMONTH ? (
                <RadioButtonChecked className="w-5 h-5" />
              ) : (
                <RadioButtonUnchecked className="w-5 h-5" />
              )}
              {Costs.PERMONTH}
            </div>
          </Card>
          <div className="flex justify-end items-center gap-14">
            <PaypalLogo className="w-24 h-16 mt-6" /> 
            <Typography>Or</Typography>
            <StripeLogo className="w-24 h-16 mt-6 mr-[-16px]" />
          </div>
        </>
      )}
    </>
  )
}

export default AccountManagement
