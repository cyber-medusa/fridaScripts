Java.perform(function () {
    var targetPackage = "com.example.app";

    var activityClass = Java.use("android.app.Activity");

    activityClass.onNewIntent.implementation = function (intent) {
        this.onNewIntent(intent);

        var action = intent.getAction();
        console.log("[*] Deep Link Action: " + action);

        var data = intent.getData();
        if (data) {
            console.log("[*] Deep Link Data: " + data.toString());
        } else {
            console.log("[*] No deep link data found.");
        }

        var extras = intent.getExtras();
        if (extras) {
            console.log("[*] Extras:");
            var keys = extras.keySet().toArray();
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = extras.get(key);
                console.log("[*] " + key + ": " + value);
            }
        }
    };

    activityClass.onCreate.implementation = function (savedInstanceState) {
        this.onCreate(savedInstanceState);

        var intent = this.getIntent();

        var action = intent.getAction();
        console.log("[*] Deep Link Action (onCreate): " + action);

        var data = intent.getData();
        if (data) {
            console.log("[*] Deep Link Data (onCreate): " + data.toString());
        } else {
            console.log("[*] No deep link data found (onCreate).");
        }

        var extras = intent.getExtras();
        if (extras) {
            console.log("[*] Extras (onCreate):");
            var keys = extras.keySet().toArray();
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = extras.get(key);
                console.log("[*] " + key + ": " + value);
            }
        }
    };
});
