import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

Future<bool> signIn(String email, String password) async {
  try {
    await FirebaseAuth.instance
        .signInWithEmailAndPassword(email: email, password: password);
    return true;
  } catch (e) {
    print(e);
    return false;
  }
}

Future<bool> register(String email, String password) async {
  try {
    await FirebaseAuth.instance
        .createUserWithEmailAndPassword(email: email, password: password);
    return true;
  } on FirebaseAuthException catch (e) {
    if (e.code == 'weak-password') {
      print('The password provided is too weak.');
    } else if (e.code == 'email-already-in-use') {
      print('The account already exists for that email.');
    }
    return false;
  } catch (e) {
    print(e.toString());
    return false;
  }
}

void addInfo(
    {String email,
    String phone,
    String firstName,
    String lastName,
    String address}) async {
  try {
    String uid = FirebaseAuth.instance.currentUser.uid;

    DocumentReference documentReference =
        FirebaseFirestore.instance.collection('Users').doc(uid);

    documentReference.set({
      'email': email,
      'phone': phone,
      'first_name': firstName,
      'last_name': lastName,
      'address': address
    });
  } catch (e) {}
}

void addAnnouncement(String announcement, FieldValue date) {
  try {
    String uid = FirebaseAuth.instance.currentUser.uid;

    CollectionReference collectionReference = FirebaseFirestore.instance
        .collection('Users')
        .doc(uid)
        .collection('Announcements');

    collectionReference.add({'announcement': announcement, 'date': date});
  } catch (e) {}
}

Stream<QuerySnapshot> getAllAnnouncements() {
  String uid = FirebaseAuth.instance.currentUser.uid;

  return FirebaseFirestore.instance
      .collection('Users')
      .doc(uid)
      .collection('Announcements')
      .orderBy('date', descending: true)
      .snapshots();
}

class SearchService {
  searchByPhone(String searchField) async {
    String uid = FirebaseAuth.instance.currentUser.uid;
    DocumentSnapshot s =
        await FirebaseFirestore.instance.collection('Users').doc(uid).get();
    String location = s.data()['address'];
    return (await FirebaseFirestore.instance
            .collection('Subscribers')
            .where('location', isEqualTo: location)
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
