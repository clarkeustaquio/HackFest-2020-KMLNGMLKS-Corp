import 'package:bayanihan_news/helper/about_us_widgets.dart';
import 'package:flutter/material.dart';

class AboutUsView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: Alignment.center,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 300,
            margin: EdgeInsets.all(5),
            child: RaisedButton(
              child: Text(
                'About The Application',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => AboutAppView()));
              },
              color: Color(0xff4d74c2),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15.0),
                  side: BorderSide(color: Color(0xff285bc1))),
            ),
          ),
          Container(
            width: 300,
            margin: EdgeInsets.all(5),
            child: RaisedButton(
              child: Text(
                'Contact Us',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => ContactUsView()));
              },
              color: Color(0xff4d74c2),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15.0),
                  side: BorderSide(color: Color(0xff285bc1))),
            ),
          ),
          Container(
            width: 300,
            margin: EdgeInsets.all(5),
            child: RaisedButton(
              child: Text(
                'About Us',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => AboutUsInfoView()));
              },
              color: Color(0xff4d74c2),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15.0),
                  side: BorderSide(color: Color(0xff285bc1))),
            ),
          ),
          Container(
            width: 300,
            margin: EdgeInsets.all(5),
            child: RaisedButton(
              child: Text(
                'Version',
                style: TextStyle(fontWeight: FontWeight.bold),
              ),
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (context) => VersionView()));
              },
              color: Color(0xff4d74c2),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(15.0),
                  side: BorderSide(color: Color(0xff285bc1))),
            ),
          ),
        ],
      ),
    );
  }
}
