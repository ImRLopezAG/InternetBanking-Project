import 'package:flutter/material.dart';
import 'package:internet_banking/src/src.dart';

class TopBar extends StatelessWidget implements PreferredSizeWidget {
  final GlobalKey<ScaffoldState> drawerKey;
  final String title;
  const TopBar(
      {Key? key, required this.drawerKey, this.title = 'Internet Banking'})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 120.0,
      decoration: BoxDecoration(
        color: Colors.blue[900]!,
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(
            49.0,
          ),
          bottomRight: Radius.circular(
            49.0,
          ),
        ),
      ),
      child: Container(
        margin: const EdgeInsets.only(
          top: 10.0,
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 15.0),
          child: AppBar(
            backgroundColor: Colors.transparent,
            elevation: 0.0,
            leading: CircleAvatar(
              radius: 30.0,
              backgroundColor: Colors.white,
              child: IconButton(
                onPressed: drawerKey.currentState!.openDrawer,
                icon: Icon(Icons.person, color: Colors.blue[900], size: 30.0),
              ),
            ),
            title: Text(
              title,
              style: const TextStyle(
                fontSize: 30.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            centerTitle: true,
            actions: [
              IconButton(
                onPressed: () =>
                    showSearch(context: context, delegate: SearchBeneficiary()),
                icon: const Icon(
                  Icons.search_rounded,
                  color: Colors.white,
                  size: 30.0,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(100.0);
}
