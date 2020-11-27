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
          : Column(
              children: [
                RaisedButton(
                  child: Text('Sign-out'),
                  onPressed: () {},
                ),
                SingleChildScrollView(
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
                              FlatButton(
                                child: Text('List Numbers'),
                                onPressed: () {},
                              ),
                              FlatButton(
                                child: Text('Add/Delete Numbers'),
                                onPressed: () {},
                              ),
                              FlatButton(
                                child: Text('Edit Numbers'),
                                onPressed: () {},
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
                              FlatButton(
                                child: Text('Edit Account'),
                                onPressed: () {},
                              ),
                              FlatButton(
                                child: Text('See Account Details'),
                                onPressed: () {},
                              ),
                            ],
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }
}
