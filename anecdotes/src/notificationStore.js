import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  notification: '',
  actions: {
    setNotification: (message) => {
      set(() => ({ notification: message }))
      setTimeout(() => {
        set(() => ({ notification: '' }))
      }, 5000);
    }
  }
}))

const useNotification = () => useNotificationStore(state => state.notification)

const useNotificationActions = () => useNotificationStore(state => state.actions)

export { useNotification, useNotificationActions }
