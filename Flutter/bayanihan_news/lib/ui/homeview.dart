import 'package:flutter/material.dart';
import 'package:bayanihan_news/helper/widgets.dart';
import 'package:bayanihan_news/ui/add_subscriber.dart';
import 'package:bayanihan_news/ui/menu.dart';
import 'package:bayanihan_news/ui/news_view.dart';
import 'package:bayanihan_news/ui/about_us.dart';

class HomePage extends StatefulWidget {
  final bool _isAuthorized;

  HomePage(this._isAuthorized);
  @override
  _HomePageState createState() => _HomePageState(_isAuthorized);
}

class _HomePageState extends State<HomePage> {
  int _currentIndex = 0;
  MenuItem active;
  final bool _isAuthorized;

  List items = [
    MenuItem(
      x: -1.0,
      icon: Icons.article,
      color: Color(0xffE16D7A),
      index: 0,
      screenName: 'news',
    ),
    MenuItem(
      x: -0.33333333334,
      icon: Icons.person_add,
      color: Color(0xff4D74C2),
      index: 1,
      screenName: 'subscribers',
    ),
    MenuItem(
      x: 0.33333333332,
      icon: Icons.how_to_reg,
      color: Colors.yellow[700],
      index: 2,
      screenName: 'autorize',
    ),
    MenuItem(
      x: 1.0,
      icon: Icons.info,
      color: Color(0xff4DAFC2),
      index: 3,
      screenName: 'about_us',
    ),
  ];

  _HomePageState(this._isAuthorized);

  @override
  void initState() {
    super.initState();
    active = items[0]; // <-- 1. Activate a menu item
  }

  bool getIsAuthorized() {
    return _isAuthorized;
  }

  Widget getCurrentScreen() {
    switch (_currentIndex) {
      case 0:
        return NewsView();
        break;
      case 1:
        return AddSubscriberView();
        break;
      case 2:
        return MenuView(getIsAuthorized);
        break;
      default:
        return AboutUsView();
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    double w = MediaQuery.of(context).size.width;
    return Scaffold(
      backgroundColor: Color(0xffeff0f5),
      appBar: MyAppBar(),
      body: getCurrentScreen(),
      bottomNavigationBar: Container(
        height: 60,
        decoration: BoxDecoration(
          color: Colors.white70,
        ),
        child: Stack(
          children: [
            AnimatedContainer(
              duration: Duration(milliseconds: 200),
              alignment: Alignment(active.x, -1),
              child: AnimatedContainer(
                duration: Duration(milliseconds: 1000),
                height: 8,
                width: w * 0.25,
                color: active.color,
              ),
            ),
            Container(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: items.map((item) {
                  return icon(item);
                }).toList(),
              ),
            )
          ],
        ),
      ),
    );
  }

  Widget icon(MenuItem item) {
    return GestureDetector(
      child: AspectRatio(
        aspectRatio: 1,
        child: Padding(
          padding: EdgeInsets.only(top: 8),
          child: Column(
            children: [
              Container(
                height: 45,
                child: Icon(
                  item.icon,
                  size: 28,
                ),
              ),
              //Text(item.screenName)
            ],
          ),
        ),
      ),
      onTap: () {
        setState(() {
          _currentIndex = item.index;
          active = item;
        });
      },
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
