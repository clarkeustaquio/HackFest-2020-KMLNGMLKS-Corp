import 'package:bayanihan_news/helper/widgets.dart';
import 'package:flutter/material.dart';

class AboutAppView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Column(
          children: [
            Opacity(opacity: 0.88, child: CustomAppBar()),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.1,
            ),
            Text('About The Application',
                style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold)),
            Container(
              padding: EdgeInsets.all(20),
              child: Text(
                  '-Provides instant news via text message\n-Daily news provider.\n-Accurate and reliable news posted.\n-Can be viewed via text message, mobile app, and website.\n-Prioritizes important news.',
                  style: TextStyle(fontSize: 18)),
            )
          ],
        ),
      ),
    );
  }
}

class ContactUsView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Column(
          children: [
            Opacity(opacity: 0.88, child: CustomAppBar()),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.1,
            ),
            Text('Contact Us',
                style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold)),
            Container(
              padding: EdgeInsets.all(20),
              child: Text('Github: https://github.com/jeikatsu/Bayanihan-News',
                  style: TextStyle(fontSize: 18)),
            )
          ],
        ),
      ),
    );
  }
}

class AboutUsInfoView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Column(
          children: [
            Opacity(opacity: 0.88, child: CustomAppBar()),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.1,
            ),
            Text('About Us',
                style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.03,
            ),
            Container(
              alignment: Alignment.centerLeft,
              child: Text('KMLNGMLKS Corp.',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            ),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.01,
            ),
            Text('Joruel Brana', style: TextStyle(fontSize: 18)),
            Text('Clark Eustaquio', style: TextStyle(fontSize: 18)),
            Text('CJ Fatalla', style: TextStyle(fontSize: 18)),
            Text('Alexander Gali', style: TextStyle(fontSize: 18)),
          ],
        ),
      ),
    );
  }
}

class VersionView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Column(
          children: [
            Opacity(opacity: 0.88, child: CustomAppBar()),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.1,
            ),
            Text('version',
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold)),
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.1,
            ),
            Text('04.2021.09.00',
                style: TextStyle(fontSize: 26, fontWeight: FontWeight.bold))
          ],
        ),
      ),
    );
  }
}
