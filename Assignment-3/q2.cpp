#include <bits/stdc++.h>
using namespace std;

int main() {
    int N;
    cin >> N;

    vector<int> points(N);

    for (int i = 0; i < N; i++) {
        cin >> points[i];
    }

    if (N == 1) {
        cout << points[0] << endl;
        return 0;
    }

    vector<int> dp(N);

    dp[0] = points[0];
    dp[1] = max(points[0], points[1]);

    for (int i = 2; i < N; i++) {
        dp[i] = max(dp[i - 1], dp[i - 2] + points[i]);
    }

    cout << dp[N - 1] << endl;

    return 0;
}