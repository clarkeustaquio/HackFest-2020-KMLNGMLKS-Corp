import 'package:http/http.dart' as http;
import 'dart:convert';

Future<List<String>> getLocations() async {
  List<String> location = [];
  String url = "http://bkintanar.site/api/provinces?include=municipalities";

  var response = await http.get(url);

  var jsonData = jsonDecode(response.body);

  jsonData["data"].forEach((element) {
    String province = ', ' + element['name'];
    element['municipalities'].forEach((entry) {
      location.add(entry['name'] + province);
    });
  });
  return location;
}
