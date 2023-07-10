import {PasswordError} from "../models/password-error";

export const passwordSubErrorsList: PasswordError[] = [
	{
		errorName: 'min',
		status: false,
		text: '8+ characters',
	},
	{
		errorName: 'oneUpperCase',
		status: false,
		text: '1 uppercase',
	},
	{
		errorName: 'oneLowerCase',
		status: false,
		text: '1 lowercase',
	},
	{
		errorName: 'oneDigit',
		status: false,
		text: '1 digit',
	},
]

export const passwordMainErrorsList: PasswordError[] = [
	{
		errorName: 'cyrillic',
		status: false,
		text: 'Please use only Latin letters',
	},
	{
		errorName: 'minLength',
		status: false,
		text: 'Please enter minimum 8 symbols',
	},
	{
		errorName: 'doesNotMeetMinimal',
		status: false,
		text: "Password doesn't meet minimal requirements",
	},
	{
		errorName: 'maxLength',
		status: false,
		text: 'Please enter maximum 24 symbols',
	},
]
