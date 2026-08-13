#include <bits/stdc++.h>
using namespace std;

int main() {
    int N;
    long long B;

    cin >> N >> B;

    vector<long long> scholarship(N);

    for (int i = 0; i < N; i++) {
        cin >> scholarship[i];
    }

    sort(scholarship.begin(), scholarship.end());

    int count = 0;

    for (int i = 0; i < N; i++) {
        if (scholarship[i] <= B) {
            B -= scholarship[i];
            count++;
        } else {
            break;
        }
    }

    cout << count << endl;

    return 0;
}