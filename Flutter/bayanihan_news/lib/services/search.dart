import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class SearchService {
  searchByAddress(String searchField) async {
    return (await FirebaseFirestore.instance
            .collection('Users')
            .where('address', isGreaterThanOrEqualTo: searchField)
            .where('address', isLessThan: searchField + 'z')
            .get())
        .docs;
  }

  searchByPhone(String searchField) async {
    String uid = FirebaseAuth.instance.currentUser.uid;
    return (await FirebaseFirestore.instance
            .collection('Users')
            .doc(uid)
            .collection('Numbers')
            .where('phone_number', isEqualTo: searchField)
            .get())
        .docs;
  }

  getAllPhone() async {
    String uid = FirebaseAuth.instance.currentUser.uid;
    DocumentSnapshot s =
        await FirebaseFirestore.instance.collection('Users').doc(uid).get();
    String location = s.data()['address'];
    return (await FirebaseFirestore.instance
            .collection('Subscribers')
            .where('location', isEqualTo: location)
            .get())
        .docs;
  }
}
