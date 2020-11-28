import 'package:bayanihan_news/helper/widgets.dart';
import 'package:bayanihan_news/services/validators.dart';
import 'package:flutter/material.dart';

Widget firstNameTextFormField(TextEditingController controller) {
  return CustomTextField(
    icon: Icons.person,
    hint: "First Name",
    controller: controller,
    validator: hasValueValidator,
    keyboardType: TextInputType.text,
  );
}

Widget lastNameTextFormField(TextEditingController controller) {
  return CustomTextField(
    icon: Icons.person,
    hint: "Last Name",
    controller: controller,
    validator: hasValueValidator,
    keyboardType: TextInputType.text,
  );
}

Widget emailTextFormField(TextEditingController controller) {
  return CustomTextField(
    icon: Icons.email,
    hint: "Email",
    controller: controller,
    validator: emailValidator,
    keyboardType: TextInputType.emailAddress,
  );
}

Widget phoneTextFormField(TextEditingController controller) {
  return CustomTextField(
    icon: Icons.phone,
    controller: controller,
    validator: phoneValidator,
    hint: "9xxxxxxxxx",
    keyboardType: TextInputType.text,
    prefix: '+63',
  );
}

Widget passwordTextFormField(String _password, TextEditingController _pass) {
  return CustomTextField(
    icon: Icons.lock,
    obsecure: true,
    controller: _pass,
    onSaved: (input) => _password = input,
    validator: (val) {
      if (val.isEmpty) return 'Empty';
      return null;
    },
    hint: "Password",
    keyboardType: TextInputType.text,
  );
}

Widget confirmPasswordTextFormField(String _confirmPassword,
    TextEditingController _confirmPass, TextEditingController _pass) {
  return CustomTextField(
    icon: Icons.lock,
    obsecure: true,
    controller: _confirmPass,
    onSaved: (
      input,
    ) =>
        _confirmPassword = input,
    validator: (val) {
      if (val.isEmpty) return 'Empty';
      if (val != _pass.text) return 'Not Match';
      return null;
    },
    hint: "Confirm Password",
    keyboardType: TextInputType.text,
  );
}

Widget addressTextFormField(String _address) {
  return CustomTextField(
    icon: Icons.place,
    hint: "Address",
    onSaved: (input) {
      _address = input;
    },
    validator: hasValueValidator,
    keyboardType: TextInputType.text,
  );
}
