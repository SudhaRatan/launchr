package com.launchr // replace your-apps-package-name with your app’s package name
import android.content.Intent
import android.content.pm.ResolveInfo
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.Drawable
import android.net.Uri
import android.provider.Settings
import android.util.Base64
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.ByteArrayOutputStream


class AppInfoLauncherModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val reactCxt = reactContext

    override fun getName(): String = "AppInfoLauncher"

    private class AppDetail {
        var label: CharSequence? = null
        var packageName: CharSequence? = null
        var icon: Drawable? = null
        override fun toString(): String {
            val icon = if (icon!!.intrinsicWidth <= 0 || icon!!.intrinsicHeight <= 0) {
                Bitmap.createBitmap(
                    1,
                    1,
                    Bitmap.Config.ARGB_8888
                ) // Single color bitmap will be created of 1x1 pixel
            } else {
                Bitmap.createBitmap(
                    icon!!.intrinsicWidth,
                    icon!!.intrinsicHeight, Bitmap.Config.ARGB_8888
                )
            }
            val canvas = Canvas(icon)
            this.icon!!.setBounds(0, 0, canvas.width, canvas.height)
            this.icon!!.draw(canvas)

            val byteArrayOutputStream = ByteArrayOutputStream()
            icon.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
            val byteArray = byteArrayOutputStream.toByteArray()
            val encoded: String = Base64.encodeToString(byteArray, Base64.NO_WRAP)

            return "{\"label\":\"" + this.label + "\",\"packageName\":\"" + this.packageName + "\",\"icon\":\"" + encoded + "\"}"
        }
    }

    @ReactMethod
    fun launch(pkg: String) {
        val intent =
            Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                .setData(Uri.fromParts("package", pkg, null))

        reactCxt.startActivity(intent)
    }

    @ReactMethod
    fun getApps(promise: Promise) {
        try {
            val l = mutableListOf<AppDetail>()
            val pManager = reactCxt.packageManager
            val intent = Intent(Intent.ACTION_MAIN, null).apply {
                addCategory(Intent.CATEGORY_LAUNCHER)
            }
            val allApps: List<ResolveInfo> = pManager.queryIntentActivities(intent, 0)
            for (ri in allApps) {
                val app = AppDetail().apply {
                    packageName = ri.activityInfo.packageName
                    label = ri.loadLabel(pManager).toString()
                    icon = ri.activityInfo.loadIcon(reactCxt.packageManager)
                }
                l.add(app)
            }
            promise.resolve(l.toString())
        } catch (e: Exception) {
            promise.reject("Error", e)
        }
    }


}