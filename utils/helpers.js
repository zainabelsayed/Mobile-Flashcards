import React from 'react'
import { AsyncStorage } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'

const NOTIFICATION_KEY = 'MobileFlashCards:notification'
const CHANNELID = 'andriodChannel'

export function clearLocalNotifications () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
            .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotifications () {
    return {
        title : 'Study!',
        body : "Don't forget to study for today!",
        ios:{
            sound:true,
        },
        android:{
            channelID: CHANNELID,
            sticky:false,

        }
    }
}

export async function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then ( (data)=>{
            console.log(data)
            if (data === null){
               Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({status})=>{
                  console.log(data)
                    if(status === 'granted' ){
                        console.log(status)
                        Notifications.createChannelAndroidAsync(CHANNELID, {
                          name: 'Event Notes',
                          description: 'flash cards reminder',
                          sound: true,
                          priority: 'max',
                          vibrate: true,
                          badge: true
                          }).then((value)=>{
                            console.log(value)
                          }).then(()=>{
                            Notifications.cancelAllScheduledNotificationsAsync() 
                            let tomorrow = new Date()
                            tomorrow.setDate(tomorrow.getDate()+1)
                            tomorrow.setHours(20)
                            tomorrow.setMinutes(0)
                       
                           Notifications.scheduleLocalNotificationAsync(
                                createNotifications(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )
                                note=noteasync
                            AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
                          }).catch((err)=>{
                            console.log(err)
                          })
                    
                    }
                })
            }
        })
       
}
