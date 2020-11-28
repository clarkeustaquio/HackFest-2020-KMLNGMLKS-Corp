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
  TextEditingController _controller = new TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool _autoValidate = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Form(
              child: Column(children: <Widget>[
                phoneTextFormField(_controller),
              ]),
              key: _formKey,
              autovalidate: _autoValidate,
            ),
            Column(
              children: [
                RaisedButton(
                  child: Text("Add"),
                  onPressed: _validateAddPhoneInput,
                ),
                RaisedButton(
                  child: Text("Delete"),
                  onPressed: _validateDeletePhoneInput,
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  void _validateAddPhoneInput() async {
    final FormState form = _formKey.currentState;
    if (_formKey.currentState.validate()) {
      form.save();
      try {
        String uid = FirebaseAuth.instance.currentUser.uid;

        DocumentReference documentReference = FirebaseFirestore.instance
            .collection('Users')
            .doc(uid)
            .collection('Numbers')
            .doc(_controller.text);

        documentReference.set({'phone_number': '+63' + _controller.text});
        sendSms('+63' + _controller.text,
            '-Thank you for subscribing to Bayanihan News. You will now receive daily news from us.');
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
        String uid = FirebaseAuth.instance.currentUser.uid;

        FirebaseFirestore.instance
            .collection('Users')
            .doc(uid)
            .collection('Numbers')
            .doc(_controller.text)
            .delete();
        sendSms('+63' + _controller.text,
            '-You unsubscribed to Bayanihan News. You will no longer receive daily news. Thank you!');
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
                  height: MediaQuery.of(context).size.height * 0.1,
                ),
                Text('Old Number'),
                phoneTextFormField(_oldNumber),
                SizedBox(
                  height: MediaQuery.of(context).size.height * 0.1,
                ),
                Text('New Number'),
                phoneTextFormField(_newNumber),
              ]),
              key: _formKey,
              autovalidate: _autoValidate,
            ),
            Column(
              children: [
                RaisedButton(
                  child: Text("Edit"),
                  onPressed: _validateEditPhoneInput,
                ),
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

        await FirebaseFirestore.instance
            .collection('Users')
            .doc(uid)
            .collection('Numbers')
            .doc(_oldNumber.text)
            .delete();

        DocumentReference documentReference = FirebaseFirestore.instance
            .collection('Users')
            .doc(uid)
            .collection('Numbers')
            .doc(_newNumber.text);

        documentReference.set({'phone_number': _newNumber.text});
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
