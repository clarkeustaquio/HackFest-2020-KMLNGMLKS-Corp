import 'package:bayanihan_news/helper/account_settings.dart';
import 'package:bayanihan_news/helper/manage_community.dart';
import 'package:bayanihan_news/ui/homeview.dart';
import 'package:bayanihan_news/ui/message.dart';
import 'package:flutter/material.dart';
import 'package:bayanihan_news/helper/widgets.dart';

class MenuView extends StatelessWidget {
  final Function _getIsAuthorized;

  MenuView(this._getIsAuthorized);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: (!_getIsAuthorized())
          ? AccessDeniedPage()
          : Center(
              child: SingleChildScrollView(
                child: Column(
                  children: <Widget>[
                    Column(
                      children: <Widget>[
                        Text(
                          'Manage Community',
                          style: TextStyle(
                              fontSize: 25, fontWeight: FontWeight.bold),
                        ),
                        Column(
                          children: <Widget>[
                            TextButton(
                              child: Text('List Numbers'),
                              onPressed: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => ListNumbers()));
                              },
                            ),
                            TextButton(
                              child: Text('Add/Delete Numbers'),
                              onPressed: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            AddDeleteNumbers()));
                              },
                            ),
                            TextButton(
                              child: Text('Edit Numbers'),
                              onPressed: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => EditNumbers()));
                              },
                            ),
                            TextButton(
                              child: Text('Message Subscribers'),
                              onPressed: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => MessageView()));
                              },
                            ),
                          ],
                        ),
                      ],
                    ),
                    SizedBox(
                      height: MediaQuery.of(context).size.height * 0.05,
                    ),
                    Column(
                      children: <Widget>[
                        Text(
                          'Account',
                          style: TextStyle(
                              fontSize: 25, fontWeight: FontWeight.bold),
                        ),
                        Column(
                          children: <Widget>[
                            TextButton(
                              child: Text('Edit Account'),
                              onPressed: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) => EditView()));
                              },
                            ),
                            TextButton(
                              child: Text('See Account Details'),
                              onPressed: () {
                                Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                        builder: (context) =>
                                            AccountDetails()));
                              },
                            ),
                            ElevatedButton(
                              child: Text('Sign-out'),
                              onPressed: () {
                                Navigator.pushAndRemoveUntil(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) => HomePage(false)),
                                  (Route<dynamic> route) => false,
                                );
                              },
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}
