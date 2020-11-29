import 'package:bayanihan_news/helper/input_fields.dart';
import 'package:bayanihan_news/helper/locations.dart';
import 'package:bayanihan_news/services/validators.dart';
import 'package:bayanihan_news/ui/homeview.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:bayanihan_news/helper/widgets.dart';
import 'package:searchable_dropdown/searchable_dropdown.dart';

class RegisterView extends StatefulWidget {
  @override
  _RegisterViewState createState() => _RegisterViewState();
}

class _RegisterViewState extends State<RegisterView> {
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final TextEditingController _pass = TextEditingController();
  final TextEditingController _confirmPass = TextEditingController();

  //FIELDS INPUT
  String _email;
  String _password;
  String _confirmPassword;
  String _lastName;
  String _firstName;
  String _address;
  String _phone;

  bool _loading = false;
  bool _autoValidate = false;
  String errorMsg = "";
  bool checkBoxValue = false;

  //responsive values
  double _height;
  double _width;
  double _pixelRatio;
  bool _large;
  bool _medium;

  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    Color primaryColor = Theme.of(context).primaryColor;
    _height = MediaQuery.of(context).size.height;
    _width = MediaQuery.of(context).size.width;
    _pixelRatio = MediaQuery.of(context).devicePixelRatio;
    _large = ResponsiveWidget.isScreenLarge(_width, _pixelRatio);
    _medium = ResponsiveWidget.isScreenMedium(_width, _pixelRatio);

    void _validateRegisterInput() async {
      final FormState form = _formKey.currentState;
      if (_formKey.currentState.validate()) {
        form.save();
        setState(() {
          _loading = true;
        });
        try {
          await FirebaseAuth.instance.createUserWithEmailAndPassword(
              email: _email, password: _pass.text);

          Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (context) => HomePage(true)),
            (Route<dynamic> route) => false,
          );

          String uid = FirebaseAuth.instance.currentUser.uid;

          DocumentReference documentReference =
              FirebaseFirestore.instance.collection('Users').doc(uid);

          documentReference.set({
            'email': _email,
            'phone': '+63' + _phone,
            'first_name': _firstName,
            'last_name': _lastName,
            'address': _address
          });

          setState(() {
            _loading = false;
          });
        } catch (error) {
          switch (error.code) {
            case "ERROR_EMAIL_ALREADY_IN_USE":
              {
                setState(() {
                  errorMsg = "This email is already in use.";
                  _loading = false;
                });
                showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        content: Container(
                          child: Text(errorMsg),
                        ),
                      );
                    });
              }
              break;
            case "ERROR_WEAK_PASSWORD":
              {
                setState(() {
                  errorMsg = "The password must be 6 characters long or more.";
                  _loading = false;
                });
                showDialog(
                    context: context,
                    builder: (BuildContext context) {
                      return AlertDialog(
                        content: Container(
                          child: Text(errorMsg),
                        ),
                      );
                    });
              }
              break;
            default:
              {
                setState(() {
                  errorMsg = "";
                });
              }
          }
        }
      } else {
        setState(() {
          _autoValidate = true;
        });
      }
    }

    Widget clipShape() {
      return Stack(
        children: <Widget>[
          Opacity(
            opacity: 0.75,
            child: ClipPath(
              clipper: CustomShapeClipper(),
              child: Container(
                height: _large
                    ? _height / 8
                    : (_medium ? _height / 7 : _height / 6.5),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xffFDDF5C), Color(0xff4D74C2)],
                  ),
                ),
              ),
            ),
          ),
          Opacity(
            opacity: 0.5,
            child: ClipPath(
              clipper: CustomShapeClipper2(),
              child: Container(
                height: _large
                    ? _height / 12
                    : (_medium ? _height / 11 : _height / 10),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [Color(0xffFDDF5C), Color(0xff4D74C2)],
                  ),
                ),
              ),
            ),
          ),
        ],
      );
    }

    Widget form() {
      return Container(
        margin: EdgeInsets.only(
            left: _width / 12.0, right: _width / 12.0, top: _height / 20.0),
        child: Form(
          child: Column(children: <Widget>[
            CustomTextField(
              icon: Icons.email,
              hint: "Email",
              onSaved: (input) {
                _email = input;
              },
              validator: emailValidator,
              keyboardType: TextInputType.emailAddress,
            ),
            SizedBox(height: _height / 60.0),
            CustomTextField(
              icon: Icons.phone,
              onSaved: (input) {
                _phone = input;
              },
              validator: phoneValidator,
              hint: "9xxxxxxxxx",
              keyboardType: TextInputType.text,
              prefix: '+63',
            ),
            SizedBox(height: _height / 60.0),
            passwordTextFormField(_password, _pass),
            SizedBox(height: _height / 60.0),
            CustomTextField(
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
            ),
            SizedBox(height: _height / 60.0),
            CustomTextField(
              icon: Icons.person,
              hint: "First Name",
              onSaved: (input) {
                _firstName = input;
              },
              validator: hasValueValidator,
              keyboardType: TextInputType.text,
            ),
            SizedBox(height: _height / 60.0),
            CustomTextField(
              icon: Icons.person,
              hint: "Last Name",
              onSaved: (input) {
                _lastName = input;
              },
              validator: hasValueValidator,
              keyboardType: TextInputType.text,
            ),
            SizedBox(height: _height / 60.0),
            FutureBuilder<List<String>>(
              future: getLocations(), // async work
              builder:
                  (BuildContext context, AsyncSnapshot<List<String>> snapshot) {
                List<DropdownMenuItem> i = [];
                if (snapshot.data != null) {
                  snapshot.data.forEach((element) {
                    i.add(
                        DropdownMenuItem(child: Text(element), value: element));
                  });
                }

                return SearchableDropdown.single(
                  items: i,
                  value: _address,
                  hint: "Select one",
                  searchHint: "Select one",
                  onChanged: (value) {
                    _address = value;
                  },
                  isExpanded: true,
                  icon: Icon(Icons.place),
                  label: 'Location',
                );
              },
            ),
          ]),
          key: _formKey,
          autovalidate: _autoValidate,
        ),
      );
    }

    Widget registerButton() {
      return _loading
          ? CircularProgressIndicator(
              valueColor: new AlwaysStoppedAnimation<Color>(primaryColor),
            )
          : RaisedButton(
              elevation: 0,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30.0)),
              onPressed: _validateRegisterInput,
              textColor: Colors.white,
              padding: EdgeInsets.all(0.0),
              child: Container(
                alignment: Alignment.center,
                width: _large
                    ? _width / 3
                    : (_medium ? _width / 2.75 : _width / 2.5),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.all(Radius.circular(20.0)),
                  gradient: LinearGradient(
                    colors: <Color>[Color(0xffFDDF5C), Color(0xff4D74C2)],
                  ),
                ),
                padding: const EdgeInsets.all(12.0),
                child: Text(
                  'Register',
                  style: TextStyle(
                      fontSize: _large ? 18 : (_medium ? 12 : 14),
                      color: Colors.black,
                      fontWeight: FontWeight.w400),
                ),
              ),
            );
    }

    Widget signInTextRow() {
      return Container(
        margin: EdgeInsets.only(top: _height / 20.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              "Already have an account?",
              style: TextStyle(fontWeight: FontWeight.w400),
            ),
            SizedBox(
              width: 5,
            ),
            GestureDetector(
              onTap: () {
                Navigator.of(context).pop();
                print("Routing to Sign up screen");
              },
              child: Text(
                "Login",
                style: TextStyle(
                    fontWeight: FontWeight.w800,
                    color: Colors.orange[200],
                    fontSize: 19),
              ),
            )
          ],
        ),
      );
    }

    Widget registerUpLabelTextRow() {
      return Container(
        margin: EdgeInsets.only(left: _width / 20, top: _height / 100),
        child: Row(
          children: <Widget>[
            Text(
              "Register",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: _large ? 60 : (_medium ? 50 : 40),
              ),
            ),
          ],
        ),
      );
    }

    return Scaffold(
        key: _scaffoldKey,
        body: Container(
          height: _height,
          width: _width,
          margin: EdgeInsets.only(bottom: 5),
          child: SingleChildScrollView(
            child: Column(
              children: <Widget>[
                Opacity(opacity: 0.88, child: CustomAppBar()),
                clipShape(),
                registerUpLabelTextRow(),
                form(),
                SizedBox(
                  height: _height / 35,
                ),
                registerButton(),
                signInTextRow(),
                SizedBox(
                  height: _height / 20,
                ),
              ],
            ),
          ),
        ));
  }

  @override
  void dispose() {
    _pass.clear();
    _confirmPass.dispose();
    super.dispose();
  }
}
