<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card card-widget widget-user">
          <!-- Add the bg color to the header using any of the bg-* classes -->
          <div
            class="widget-user-header text-white"
            style="background-image: url('./img/user_cover.jpg')"
          >
            <h3 class="widget-user-username text-right">{{this.form.name}}</h3>
            <h5 class="widget-user-desc text-right">{{this.form.type}}}</h5>
          </div>
          <div class="widget-user-image">
            <!-- <img class="img-circle" :src="getProfilePhoto()" alt="User Avatar" /> -->
            <!-- <img class="img-circle" :src="getProfilePhoto()" alt="User Avatar"/> -->
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">3,200</h5>
                  <span class="description-text">SALES</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4 border-right">
                <div class="description-block">
                  <h5 class="description-header">13,000</h5>
                  <span class="description-text">FOLLOWERS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-sm-4">
                <div class="description-block">
                  <h5 class="description-header">35</h5>
                  <span class="description-text">PRODUCTS</span>
                </div>
                <!-- /.description-block -->
              </div>
              <!-- /.col -->
              <div class="col-md-12 ">
                <div class="card mt-3">
                  <div class="card-header p-2">
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a class="nav-link" href="#activity" data-toggle="tab"
                          >Activity</a
                        >
                      </li>

                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          href="#settings"
                          data-toggle="tab"
                          >Settings</a
                        >
                      </li>
                    </ul>
                  </div>
                  <!-- /.card-header -->
                  <div class="card-body">
                    <div class="tab-content">
                      <div class="tab-pane" id="activity">
                        <div>Activity content goes here</div>
                      </div>

                      <div class="tab-pane active" id="settings">
                        <form class="form-horizontal">
                          <div class="form-group row">
                            <label
                              for="name"
                              class="col-sm-2 col-form-label"
                              >Name</label
                            >
                            <div class="col-sm-10">
                              <input
                                type="text"
                                v-model="form.name"
                                class="form-control"
                                id="name"
                                placeholder="Name"
                              />
                              <has-error :form="form" field="name"></has-error>
                            </div>
                          </div>
                          <div class="form-group row">
                            <label
                              for="email"
                              class="col-sm-2 col-form-label"
                              >Email</label
                            >
                            <div class="col-sm-10">
                              <input
                                type="email"
                                v-model="form.email"
                                class="form-control"
                                id="email"
                                placeholder="Email"
                              />
                              <has-error :form="form" field="email"></has-error>
                            </div>
                          </div>

                          <div class="form-group row">
                            <label
                              for="bio"
                              class="col-sm-2 col-form-label"
                              >Bio</label
                            >
                            <div class="col-sm-10">
                              <textarea
                               v-model="form.bio"
                                class="form-control"
                                id="bio"
                                placeholder="Bio"
                              ></textarea>
                              <has-error :form="form" field="bio"></has-error>
                            </div>
                          </div>

                          <div class="form-group row">
                            <label
                              for="password"
                              class="col-sm-2 col-form-label"
                              >Password</label
                            >
                            <div class="col-sm-10">
                              <input
                                type="text"
                                v-model="form.password"
                                class="form-control"
                                id="password"
                                placeholder="Password"
                              />
                              <has-error :form="form" field="password"></has-error>
                            </div>
                          </div>

                          <!-- <div class="form-group row">
                            <label for="photo"  class="col-sm-2 col-form-label"
                              >Profile Photo</label
                            >
                            <div class="col-sm-10 mt-3">
                            <input
                              type="file"
                              @change="updateProfile"
                              class="form-control-file"
                              id="photo"
                            />
                            <has-error :form="form" field="photo"></has-error>
                            </div>
                          </div> -->

                          <div class="form-group row">
                            <div class="offset-sm-2 col-sm-10">
                              <button @click.prevent="updateInfo" type="submit" class="btn btn-danger">
                                Update
                              </button>

                            </div>
                          </div>
                        </form>
                      </div>
                      <!-- /.tab-pane -->
                    </div>
                    <!-- /.tab-content -->
                  </div>
                  <!-- /.card-body -->
                </div>
                <!-- /.card -->
              </div>
            </div>
            <!-- /.row -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.widget-user-header{
  background-position: center center;
  background-size: cover;
  height: 250px;

}
</style>




<script>
import Form from "vform";
export default {

  data(){
    return{
      form: new Form({
        id:"",
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: "",
      }),
    }
  },
  mounted() {
    console.log("Component mounted.");
  },
  methods:{
    // getProfilePhoto(){
    //   let photo =(this.form.photo.length>100) ? 'storage/'+this.form.photo : this.form.photo;
    //   return photo;
    //   // return 'storage/'+this.form.photo;
    // },
    updateInfo(){
        this.$Progress.start();
      this.form.put('api/profile/')
      .then((res)=>{

          this.$Progress.finished();
      })
      .catch(()=>{
          this.$Progress.fail();
      });
    },
    updateProfile(e){
      // console.log('uploaded file');
      let file = e.target.files[0];
      // console.log(file);
      let reader = new FileReader();
      if(file['size']<2111775){
          reader.onload = (e)=>{
              // console.log('Result', reader.result)
              console.log(e.target.result);
              this.form.photo = reader.result;
          }
          reader.readAsDataURL(file);
      }else{
          swal.fire({
              type:'error',
              title:'Oops..',
              text:'You are uploaded a large file',
          })
      }
      }

  },
  created() {
    axios.get("api/profile/")
    .then(({data})=> (this.form.fill(data)));
  }
};
</script>

