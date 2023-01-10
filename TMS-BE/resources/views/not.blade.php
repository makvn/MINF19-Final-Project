<html>
    <script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>
    <script src="https://js.pusher.com/7.2/pusher.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/laravel-echo/1.14.2/echo.min.js" integrity="sha512-lK5u2zmRy0szod4RvoQ0nON1KBW/w0DZ0/YQB0rc1dEQplBFdFohAmSzyVUFjxj/WwiSdP6gNrZ1tZp+PKLedA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/laravel-echo/1.14.2/echo.common.min.js" integrity="sha512-MbOhy3AqNIxmQP+oPhwPSmGbQWPrnfM86T4iDNUBUiBy1t7mMc4iq9/RBdDNWxcuxzG8V0vRAkg3BvXwj/roMw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/laravel-echo/1.14.2/echo.iife.min.js" integrity="sha512-3QoFR1260SUnTDdmxOz/6z83CJqTxgooxVedxv624FAXylf3HruPHlqfeLiUScvuv52caYRRGym2DCDyo/5ajw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        const beamsClient = new PusherPushNotifications.Client({
          instanceId: '686205e8-c3c0-4cc5-a0ec-b710c117beda',
        });
      
        beamsClient.start()
          .then(() => beamsClient.addDeviceInterest('line.8f8c6d67273de30d7e63f43d6f117701120ce0328c5f9b47bafb983979245cad'))
          .then(() => console.log('Successfully registered and subscribed!'))
          .catch(console.error);

          window.Pusher = Pusher;
          // Echo.connector.pusher.config.auth.headers['x-user'] = 'auth0|61bd9b038e9eeb00690fe870';

          window.Echo = new Echo({
              // namespace: 'App.Events',
              broadcaster: 'pusher',
              key: '940ec2045e6df9bb159f',
              cluster: 'ap1',
              encrypted: true,
            //   authEndpoint: 'http://localhost:8000/broadcasting/auth',
              authEndpoint: 'https://gateway.dev.mightymix.ai/broadcasting/auth',
              auth:        {
                  headers: {
                      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImtsZFVYTzRzTDlZZG9NVTFTQ3oybSJ9.eyJodHRwczovL21pZ2h0eW1peC5haS9yb2xlcyI6WyJBZG1pbmlzdHJhdG9yIiwiRW1wbG95ZWUiXSwiaXNzIjoiaHR0cHM6Ly9hdXRoLmRldi5taWdodHltaXguYWkvIiwic3ViIjoiYXV0aDB8NjFiZDliMDM4ZTllZWIwMDY5MGZlODcwIiwiYXVkIjpbImh0dHBzOi8vd2ViYXBwLnNhbXBsZSIsImh0dHBzOi8vbWlnaHR5bWl4LWRldi51cy5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjcxNzI2NDg5LCJleHAiOjE2NzE3MzAwODksImF6cCI6InNzZHJ0OWFMeE83MWx6eEh4ZkR0NGxhS21ZdmtGQ1RBIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCJ9.owvcVMdlXalyrKd6ju2pSpe7YkyiqcE9goGwhuxiWUG3PxiEQ27R29k7A8VFk_8u_Py5P4M3ethMkHgBbt6HhBchBqEJ1VhJQ2VMUUxShElo__sgWf1HC6eRQyz2rud229M_WiewactePdC_XbG41KMr2JE1oUmZ6J0SyygapKDjtgu1xRGGMkAIrxn72G2AbiG0iF-al1TTEhs4NKEA_nKDb_UxjEIXfaPSFeLXigeJkfisGRUp9DFfF86wcu8KoE6FSSDHkjgBLv8iJh4sqtk_mOWnLbqfodhsz7hkQBzSc-lR-rPmilDtBjl3X22g8YfIwJcV3yjfG7J34sxttA',
                  },
              },
          });

          Echo.private('line.8f8c6d67273de30d7e63f43d6f117701120ce0328c5f9b47bafb983979245cad')
            .notification((notification) => {
                console.log(notification);
            });
      </script>
    <body>
        
    </body>
</html>