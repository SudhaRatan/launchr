package com.launchr; // replace your-apps-package-name with your app’s package name
import android.content.Intent
import android.net.Uri
import android.provider.Settings
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AppInfoLauncherModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val reactCxt = reactContext

    override fun getName(): String = "AppInfoLauncher"

    @ReactMethod
    fun launch(pkg: String) {
        val intent =
            Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                .setData(Uri.fromParts("package", pkg, null))

        reactCxt.startActivity(intent)
    }

}