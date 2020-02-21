module.exports = ({display_name, email, password, password2}) => {
	let errors = []

	if(!display_name){
		errors.push({message: 'no display name'})
	}
	if(!email){
		errors.push({message: 'no email'})
	}
	if(!password){
		errors.push({message: 'no password'})
	}
	if(password !== password2){
		errors.push({message: 'passwords do not match'})
	}

	return {
		errors,
		notValid: Boolean(errors.length)
	}
}