import 'package:flutter/material.dart';
import 'package:bayanihan_news/helper/widgets.dart';
import 'package:bayanihan_news/ui/news_view.dart';

class HomePage extends StatefulWidget {
  HomePage();
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  _HomePageState();

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    double w = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: Color(0xffeff0f5),
      appBar: AppBar(),
      body: NewsView(),
    );
  }
}

class MenuItem {
  final IconData icon;
  final Color color;
  final double x;
  final int index;
  final String screenName;
  MenuItem({this.icon, this.color, this.x, this.index, this.screenName});
}
