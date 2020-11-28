import 'dart:ui';

import 'package:bayanihan_news/helper/input_fields.dart';
import 'package:bayanihan_news/helper/widgets.dart';
import 'package:bayanihan_news/services/search.dart';
import 'package:bayanihan_news/services/sms_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class AddDeleteNumbers extends StatefulWidget {
  @override
  _AddDeleteNumbersState createState() => _AddDeleteNumbersState();
}

class _AddDeleteNumbersState extends State<AddDeleteNumbers> {
  List<DropdownMenuItem> items = [];
  TextEditingController _controller = new TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool _autoValidate = false;
  String label = 'Receive verified daily news via SMS without going online.';
  Color labelColor = Colors.black;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(),
      body: Container(
          padding: EdgeInsets.all(7),
          child: ListView(children: <Widget>[
            ClipRRect(
              borderRadius: BorderRadius.circular(80.0),
              child: Image.asset('assets/add-sub.png'),
            ),
            SizedBox(
              height: 5,
            ),
            Text(label,
                textAlign: TextAlign.center,
                style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                    color: labelColor)),
            SizedBox(
              height: 5,
            ),
            Column(
              children: [
                Form(
                  child: Column(children: <Widget>[
                    phoneTextFormField(_controller),
                    SizedBox(
                      height: 10,
                    ),
                  ]),
                  key: _formKey,
                  autovalidate: _autoValidate,
                ),
                Column(
                  children: [
                    customButton('Add', _validateAddPhoneInput),
                    customButton('Delete', _validateDeletePhoneInput)
                  ],
                )
              ],
            ),
          ])),
    );
  }

  void _validateAddPhoneInput() async {
    final FormState form = _formKey.currentState;
    if (_formKey.currentState.validate()) {
      form.save();
      try {
        String uid = FirebaseAuth.instance.currentUser.uid;

        DocumentSnapshot address =
            await FirebaseFirestore.instance.collection('Users').doc(uid).get();

        DocumentReference documentReference = FirebaseFirestore.instance
            .collection('Subscribers')
            .doc(_controller.text);

        documentReference.set({
          'phone_number': '+63' + _controller.text,
          'location': address.get('address')
        });

        // sendSms('+63' + _controller.text,
        //     '-Thank you for subscribing to Bayanihan News. You will now receive daily news from us.');
        _controller.clear();
        label = 'Successfully Subscribed!';
        labelColor = Colors.lightGreen;
        _autoValidate = false;
        setState(() {});
      } catch (error) {}
    } else {
      setState(() {
        _autoValidate = true;
      });
    }
  }

  void _validateDeletePhoneInput() async {
    final FormState form = _formKey.currentState;
    if (_formKey.currentState.validate()) {
      form.save();
      try {
        FirebaseFirestore.instance
            .collection('Subscribers')
            .doc(_controller.text)
            .delete();
        // sendSms('+63' + _controller.text,
        //     '-You unsubscribed to Bayanihan News. You will no longer receive daily news. Thank you!');
        _controller.clear();
        label = 'Deleted Phone Number';
        labelColor = Colors.red;
        _autoValidate = false;
        setState(() {});
      } catch (error) {}
    } else {
      setState(() {
        _autoValidate = true;
      });
    }
  }
}

class EditNumbers extends StatefulWidget {
  @override
  _EditNumbersState createState() => _EditNumbersState();
}

class _EditNumbersState extends State<EditNumbers> {
  TextEditingController _oldNumber = new TextEditingController();
  TextEditingController _newNumber = new TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool _autoValidate = false;
  String editLabel = '';
  Color colorLabel = Colors.black;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Form(
              child: Column(children: <Widget>[
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.02,
                ),
                Text("Edit Number",
                    style:
                        TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.04,
                ),
                Text(editLabel,
                    style: TextStyle(fontSize: 15, color: colorLabel)),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.01,
                ),
                Text('Old Number'),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.01,
                ),
                phoneTextFormField(_oldNumber),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.05,
                ),
                Text('New Number'),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.01,
                ),
                phoneTextFormField(_newNumber),
              ]),
              key: _formKey,
              autovalidate: _autoValidate,
            ),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.05,
            ),
            Column(
              children: [
                customButton("Confirm", _validateEditPhoneInput),
              ],
            )
          ],
        ),
      ),
    );
  }

  void _validateEditPhoneInput() async {
    final FormState form = _formKey.currentState;
    if (_formKey.currentState.validate()) {
      form.save();
      try {
        String uid = FirebaseAuth.instance.currentUser.uid;

        DocumentSnapshot address =
            await FirebaseFirestore.instance.collection('Users').doc(uid).get();

        FirebaseFirestore.instance
            .collection('Subscribers')
            .doc(_oldNumber.text)
            .delete();

        FirebaseFirestore.instance
            .collection('Subscribers')
            .doc(_newNumber.text)
            .set({
          'phone_number': '+63' + _newNumber.text,
          'location': address.get('address')
        });
        _newNumber.clear();
        _oldNumber.clear();
        editLabel = 'Successfully Edited the Number';
        colorLabel = Colors.lightGreen;
        setState(() {});
      } catch (error) {}
    } else {
      setState(() {
        _autoValidate = true;
      });
    }
  }
}

class ListNumbers extends StatefulWidget {
  @override
  _ListNumbersState createState() => new _ListNumbersState();
}

class _ListNumbersState extends State<ListNumbers> {
  var tempSearchStore = [];
  @override
  void initState() {
    getAllPhoneNumbers();
    super.initState();
  }

  getAllPhoneNumbers() async {
    List<QueryDocumentSnapshot> list = await SearchService().getAllPhone();
    for (int i = 0; i < list.length; ++i) {
      tempSearchStore.add(list[i].data());
    }
    setState(() {});
  }

  initiateSearch(value) async {
    List<QueryDocumentSnapshot> list = List<QueryDocumentSnapshot>();
    if (value == '') {
      list = await SearchService().getAllPhone();
    } else {
      tempSearchStore = [];
      list = await SearchService().searchByPhone(value);
    }
    print(list.length);
    for (int i = 0; i < list.length; ++i) {
      print(list[i].data());
      tempSearchStore.add(list[i].data());
    }
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(),
      body: Container(
          child: ListView(children: <Widget>[
        Padding(
          padding: const EdgeInsets.all(10.0),
          child: TextField(
            onChanged: (val) {
              initiateSearch(val);
            },
            decoration: InputDecoration(
                prefixIcon: IconButton(
                  color: Colors.black,
                  icon: Icon(Icons.arrow_back),
                  iconSize: 20.0,
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                ),
                contentPadding: EdgeInsets.only(left: 25.0),
                hintText: 'Search Phone Number',
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(4.0))),
          ),
        ),
        SizedBox(height: 10.0),
        Column(
            children: tempSearchStore.map((element) {
          return buildResultCard(element);
        }).toList())
      ])),
    );
  }
}

Widget buildResultCard(data) {
  return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
      elevation: 2.0,
      child: Container(
          child: Center(
              child: Text(
        data['phone_number'],
        textAlign: TextAlign.center,
        style: TextStyle(
          color: Colors.black,
          fontSize: 20.0,
        ),
      ))));
}
