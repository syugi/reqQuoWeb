module.exports = {
	
     html : function(){
		return `

      <section class="login_section py-20 w-full bg-gray-200" style="order:3;">
            <h2 style="font-family: 'Do Hyeon', Sans-serif;" class="text-3xl font-midium text-center py-4">관리자 로그인</h2>
            <div class="w-full flex justify-center">
                <form class="max-w-2xl">
                  <div class="mb-4">
                    <label class="block text-md font-light mb-2" for="username">Username</label>
                    <input class="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" id="" placeholder="Username">
                  </div>
                  <div class="mb-4">
                    <label class="block text-md font-light mb-2" for="password">Password</label>
                    <input class="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="" placeholder="Password">
                  </div>

                  <div class="w-full mb-5">
                    <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-light py-4 px-6 rounded focus:outline-none focus:shadow-outline" type="button">
                      LOGIN
                    </button>
                    
                  </div>
                </form>
          </div>
    </section>
        `;
    }
}
