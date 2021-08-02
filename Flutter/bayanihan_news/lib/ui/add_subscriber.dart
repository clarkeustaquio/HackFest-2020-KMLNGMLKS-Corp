import 'package:bayanihan_news/helper/input_fields.dart';
import 'package:bayanihan_news/helper/locations.dart';
import 'package:bayanihan_news/helper/widgets.dart';
import 'package:bayanihan_news/services/sms_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:searchable_dropdown/searchable_dropdown.dart';

class AddSubscriberView extends StatefulWidget {
  @override
  _AddSubscriberView createState() => new _AddSubscriberView();
}

class _AddSubscriberView extends State<AddSubscriberView> {
  List<DropdownMenuItem> items = [];
  String selectedValue;
  TextEditingController _controller = new TextEditingController();
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  bool _autoValidate = false;
  String _label = 'Receive verified daily news via SMS without going online.';
  Color _colorLabel = Colors.black;

  @override
  Widget build(BuildContext context) {
    return new Container(
        padding: EdgeInsets.all(7),
        child: ListView(children: <Widget>[
          ClipRRect(
            borderRadius: BorderRadius.circular(80.0),
            child: Image.asset('assets/add-sub.png'),
          ),
          SizedBox(
            height: 5,
          ),
          Text(_label,
              textAlign: TextAlign.center,
              style: TextStyle(
                  fontSize: 15,
                  fontWeight: FontWeight.bold,
                  color: _colorLabel)),
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
                  FutureBuilder<List<String>>(
                    future: getLocations(), // async work
                    builder: (BuildContext context,
                        AsyncSnapshot<List<String>> snapshot) {
                      List<DropdownMenuItem> i = [];
                      if (snapshot.data != null) {
                        snapshot.data.forEach((element) {
                          i.add(DropdownMenuItem(
                              child: Text(element), value: element));
                        });
                      }

                      return SearchableDropdown.single(
                        items: i,
                        value: selectedValue,
                        hint: "Select one",
                        searchHint: "Select one",
                        onChanged: (value) {
                          selectedValue = value;
                        },
                        isExpanded: true,
                        style: TextStyle(fontSize: 20, color: Colors.black),
                        icon: Icon(
                          Icons.place,
                          size: 20,
                        ),
                        label: 'Location',
                      );
                    },
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
        ]));
  }

  void _validateAddPhoneInput() async {
    final FormState form = _formKey.currentState;
    if (_formKey.currentState.validate()) {
      form.save();
      try {
        DocumentReference documentReference = FirebaseFirestore.instance
            .collection('Subscribers')
            .doc(_controller.text);

        documentReference.set({
          'phone_number': '+63' + _controller.text,
          'location': selectedValue
        });
        sendSms('+63' + _controller.text,
            '-Thank you for subscribing to Bayanihan News. You will now receive daily news from us.');
        _controller.clear();
        _label = 'Successfully Subscribed!';
        _colorLabel = Colors.lightGreen;
        _autoValidate = false;
        selectedValue = null;
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
        sendSms('+63' + _controller.text,
            '-You unsubscribed to Bayanihan News. You will no longer receive daily news. Thank you!');
        _controller.clear();
        _label = 'Successfully Deleted Phone Number!';
        _colorLabel = Colors.red;

        _autoValidate = false;
        setState(() {});
      } catch (error) {}
    } else {
      setState(() {
        _autoValidate = true;
      });
    }
  }

  @override
  void dispose() {
    _controller.clear();
    super.dispose();
  }
}
