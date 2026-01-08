

export const NationalIdPattren="^([1-9]{1})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})[0-9]{3}([0-9]{1})[0-9]{1}$";
export const NationalOrPassportIdPattren="^[A-Za-z0-9]{3,}$";
export const LocalNamePattren="^([\u0621-\u064A\s\p{N}]{2,})[ |\u0621-\u064A\s\p{N}]{0,}$";
export const LatinNamePattren="^([a-z|A-Z]{2,})[ |A-z|a-z]{0,}$";
export const LocalBranchNamePattren="^([\u0621-\u064A\s\p{N}|[1-9]]{2,})[ |\u0621-\u064A\s\p{N}]{0,}$";
export const LatinBranchNamePattren="^([a-z|A-Z]{2,})[ |A-z|a-z|[1-9]]{0,}$";
export const NamePattrenValidation="^[A-Z|a-z|\u0621-\u064A\s\p{N}]{2,}[ |A-Z|a-z|\u0621-\u064A\s\p{N}]{0,}$";
export const NationalIdentityValidation="^[0-9]{14}$";
export const NumberPattrenValidation="^[1-9]{1}[0-9]{0,}$";
export const AgePattrenValidation="^(100|[1-9][0-9]?)$";
export const PhoneNumberValidation="^[0-9]{11,15}$";
export const PasswordPattrenValidation="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$";
export const SpechialChracterPattren="[$&+,:;=?@#|'<>.^*()%!-]";
export const CodePattrenValidation="^[A-Z|a-z|\u0621-\u064A\s\p{N}]{2,}[|A-Z|a-z|\u0621-\u064A\s\p{N}]{0,}$";
export const DayOfMonth ="^([1-9]|[12][0-9]|3[0-2])$"