import 'package:flutter/material.dart';

class SearchBeneficiary extends SearchDelegate {
  @override
  String get searchFieldLabel => 'Search users';

  @override
  List<Widget>? buildActions(BuildContext context) {
    return [
      IconButton(
        onPressed: () => query = '',
        icon: const Icon(Icons.clear_rounded),
      ),
    ];
  }

  @override
  Widget? buildLeading(BuildContext context) {
    return IconButton(
      onPressed: () => close(context, null),
      icon: const Icon(Icons.arrow_back_rounded),
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    return const Center(
      child: Text('buildResults'),
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    if (query.isEmpty) {
      return const Center(
        child:
            Icon(Icons.person_add_alt_rounded, size: 150, color: Colors.grey),
      );
    }
    return const Center(
      child: Text('buildSuggestions'),
    );
  }
}
