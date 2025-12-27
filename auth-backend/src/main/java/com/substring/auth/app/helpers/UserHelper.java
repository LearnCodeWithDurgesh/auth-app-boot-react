package com.substring.auth.app.helpers;

import java.util.UUID;

public class UserHelper {
    public static UUID parseUUID(String uuid) {
        return UUID.fromString(uuid);
    }
}
