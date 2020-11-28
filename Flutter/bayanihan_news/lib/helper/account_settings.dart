import 'package:bayanihan_news/helper/input_fields.dart';
import 'package:bayanihan_news/helper/locations.dart';
import 'package:bayanihan_news/services/validators.dart';
import 'package:bayanihan_news/ui/homeview.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:bayanihan_news/helper/widgets.dart';
import 'package:searchable_dropdown/searchable_dropdown.dart';

class EditView extends StatefulWidget {
  @override
  _EditViewState createState() => _EditViewState();
}

class _EditViewState extends State<EditView> {
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  //FIELDS INPUT

  TextEditingController _lastName = TextEditingController();
  TextEditingController _firstName = TextEditingController();
  String _address;
  TextEditingController _phone = TextEditingController();

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

    void _validateEditInput() async {
      final FormState form = _formKey.currentState;
      if (_formKey.currentState.validate()) {
        form.save();
        setState(() {
          _loading = true;
        });
        try {
          // Navigator.pushAndRemoveUntil(
          //   context,
          //   MaterialPageRoute(builder: (context) => HomePage(true)),
          //   (Route<dynamic> route) => false,
          // );

          String uid = FirebaseAuth.instance.currentUser.uid;

          DocumentSnapshot data = await FirebaseFirestore.instance
              .collection('Users')
              .doc(uid)
              .get();

          DocumentReference documentReference =
              FirebaseFirestore.instance.collection('Users').doc(uid);

          documentReference.set({
            'email': data.get('email'),
            'phone': '+63' + _phone.text,
            'first_name': _firstName.text,
            'last_name': _lastName.text,
            'address': _address
          });
          _phone.clear();
          _firstName.clear();
          _lastName.clear();
          setState(() {
            _loading = false;
          });
          _autoValidate = false;
        } catch (error) {}
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
            phoneTextFormField(_phone),
            SizedBox(height: _height / 60.0),
            firstNameTextFormField(_firstName),
            SizedBox(height: _height / 60.0),
            lastNameTextFormField(_lastName),
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
                switch (snapshot.connectionState) {
                  case ConnectionState.waiting:
                    return Text('Loading....');
                  default:
                    if (snapshot.hasError)
                      return Text('Error: ${snapshot.error}');
                    else
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
                }
              },
            ),
          ]),
          key: _formKey,
          autovalidate: _autoValidate,
        ),
      );
    }

    Widget editUpLabelTextRow() {
      return Container(
        margin: EdgeInsets.only(left: _width / 20, top: _height / 100),
        child: Row(
          children: <Widget>[
            Text(
              "Edit",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: _large ? 60 : (_medium ? 50 : 40),
              ),
            ),
          ],
        ),
      );
    }

    Widget editButton() {
      return _loading
          ? CircularProgressIndicator(
              valueColor: new AlwaysStoppedAnimation<Color>(primaryColor),
            )
          : RaisedButton(
              elevation: 0,
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30.0)),
              onPressed: _validateEditInput,
              textColor: Colors.white,
              padding: EdgeInsets.all(0.0),
              child: Container(
                alignment: Alignment.center,
//        height: _height / 20,
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
                  'edit',
                  style: TextStyle(
                      fontSize: _large ? 18 : (_medium ? 12 : 14),
                      fontWeight: FontWeight.w400,
                      color: Colors.black),
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
                editUpLabelTextRow(),
                form(),
                SizedBox(
                  height: _height / 35,
                ),
                editButton(),
                signInTextRow(),
              ],
            ),
          ),
        ));
  }
}

class AccountDetails extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: MyAppBar(),
        body: Column(
          children: [
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.1,
            ),
            Container(
              alignment: Alignment.centerLeft,
              child: Text('Account Details',
                  style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold)),
            ),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.03,
            ),
            StreamBuilder(
                stream: FirebaseFirestore.instance
                    .collection('Users')
                    .doc(FirebaseAuth.instance.currentUser.uid)
                    .snapshots(),
                builder: (context, snapshot) {
                  DocumentSnapshot user = snapshot.data;
                  return Column(children: [
                    Row(
                      children: [
                        Text('First Name: ',
                            style: TextStyle(
                                fontSize: 18, fontWeight: FontWeight.w600)),
                        Expanded(
                          child: Text(user['first_name']),
                        )
                      ],
                    ),
                    Row(
                      children: [
                        Text('Last Name: ',
                            style: TextStyle(
                                fontSize: 18, fontWeight: FontWeight.w600)),
                        Expanded(
                          child: Text(user['last_name']),
                        )
                      ],
                    ),
                    Row(
                      children: [
                        Text('Email: ',
                            style: TextStyle(
                                fontSize: 18, fontWeight: FontWeight.w600)),
                        Expanded(
                          child: Text(user['email']),
                        )
                      ],
                    ),
                    Row(
                      children: [
                        Text('Phone: ',
                            style: TextStyle(
                                fontSize: 18, fontWeight: FontWeight.w600)),
                        Expanded(
                          child: Text(user['phone']),
                        )
                      ],
                    ),
                    Row(
                      children: [
                        Text('Address: ',
                            style: TextStyle(
                                fontSize: 18, fontWeight: FontWeight.w600)),
                        Expanded(
                          child: Text(user['address']),
                        ),
                      ],
                    ),
                  ]);
                }),
          ],
        ));
  }
}
