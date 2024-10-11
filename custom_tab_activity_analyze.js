Java.perform(function() {
    var CustomTabMainActivity = Java.use('com.facebook.CustomTabMainActivity');

    CustomTabMainActivity.onCreate.overload('android.os.Bundle').implementation = function(bundle) {
        console.log('com.facebook.CustomTabMainActivity was triggered!');

        function printBundle(bundle) {
            var Bundle = Java.use('android.os.Bundle');
            var Set = Java.use('java.util.Set');
            
            
            var keys = bundle.keySet().toArray();
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = bundle.get(key);   
                console.log("key: " + key + " value: " + value);
                if (key === "CustomTabMainActivity.extra_params") {
                    console.log("Bundle[" + key + "]: Parcelled data detected");
                    var parcel = Parcel.obtain();
                    value.writeToParcel(parcel, 0);
                    parcel.setDataPosition(0);
                    var unparcelledData = Bundle.CREATOR.createFromParcel(parcel);
                    printBundle(unparcelledData);
                    parcel.recycle();
                } else {
                    console.log("Bundle[" + key + "]: " + value);
                }
            }
        }

        var intent = this.getIntent();
        console.log("Action: " + intent.getAction());
        console.log("Data: " + intent.getDataString());
        
        var extras = intent.getExtras();
        if (extras !== null) {
            console.log("Extras found:");
            printBundle(extras);
        } else {
            console.log("No extras found.");
        }

        console.log("Component: " + intent.getComponent());
        console.log("Flags: " + intent.getFlags());

        return this.onCreate(bundle);
    };
});
