String emailValidator(String value) {
  Pattern pattern =
      r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
  RegExp regex = new RegExp(pattern);
  if (value.isEmpty) return '*Required';
  if (!regex.hasMatch(value))
    return '*Enter a valid email';
  else
    return null;
}

String hasValueValidator(String value) {
  if (value.isEmpty) return '*Required';
  return null;
}

String phoneValidator(String value) {
  Pattern pattern = r'^9[0-9]{9}$';
  RegExp regex = new RegExp(pattern);
  if (value.isEmpty) return '*Required';
  if (!regex.hasMatch(value))
    return '*Enter A Valid Phone Number';
  else
    return null;
}
