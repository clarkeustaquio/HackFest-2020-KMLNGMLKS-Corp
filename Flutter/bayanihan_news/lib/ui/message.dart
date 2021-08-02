import 'package:bayanihan_news/net/flutterfire.dart';
import 'package:bayanihan_news/services/sms_service.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:bayanihan_news/helper/widgets.dart';
import 'package:intl/intl.dart';

class MessageView extends StatefulWidget {
  MessageView();

  @override
  _MessageViewState createState() => _MessageViewState();
}

class _MessageViewState extends State<MessageView> {
  List<QueryDocumentSnapshot> phoneNumbers = [];
  TextEditingController _controller = TextEditingController();

  @override
  void initState() {
    addPhoneNumbers();
    super.initState();
  }

  addPhoneNumbers() async {
    phoneNumbers = await SearchService().getAllPhone();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: EdgeInsets.all(8.0),
                    child: TextField(
                      controller: _controller,
                      keyboardType: TextInputType.multiline,
                      maxLines: null,
                      decoration: InputDecoration(
                        hintText: 'Enter Announcement',
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10.0),
                          borderSide: BorderSide(
                            width: 1,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
                Container(
                  width: 70,
                  child: TextButton(
                    child: Icon(
                      Icons.send,
                      size: 30,
                    ),
                    onPressed: () {
                      addAnnouncement(
                          _controller.text, FieldValue.serverTimestamp());
                      phoneNumbers.forEach((element) {
                        sendSms(element['phone_number'], _controller.text);
                      });
                      _controller.clear();
                    },
                  ),
                ),
              ],
            ),
            SizedBox(
              width: 5,
            ),
            StreamBuilder<QuerySnapshot>(
                stream: getAllAnnouncements(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(
                      child: CircularProgressIndicator(),
                    );
                  } else {
                    final List<DocumentSnapshot> documents = snapshot.data.docs;
                    return Column(
                        children: documents.map((element) {
                      return pastAnnouncementView(element);
                    }).toList());
                  }
                }),
          ],
        ),
      ),
    );
  }

  Widget pastAnnouncementView(data) {
    if (data['date'] == null) return CircularProgressIndicator();
    return Card(
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
        elevation: 2.0,
        child: Container(
            padding: EdgeInsets.all(5),
            child: Center(
                child: Column(
              children: [
                Container(
                  padding: EdgeInsets.all(10),
                  alignment: Alignment.centerLeft,
                  decoration: BoxDecoration(
                    border: Border(
                      bottom: BorderSide(width: 0.1, color: Colors.black),
                    ),
                  ),
                  child: Text(
                    data['announcement'],
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 20.0,
                    ),
                  ),
                ),
                Container(
                  alignment: Alignment.centerRight,
                  child: Text(
                    formatDate(data['date'].toDate()),
                    textAlign: TextAlign.right,
                    style: TextStyle(color: Colors.orange[400]),
                  ),
                )
              ],
            ))));
  }

  String formatDate(data) {
    return DateFormat.yMMMd().add_jm().format(data);
  }
}
