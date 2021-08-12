<template>
  <div class="container">
    <div class="row mt-5" v-if="$gate.isAdminOrAuthor()">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Users Table</h3>

            <div class="card-tools">
              <button type="button" class="btn btn-success" @click="newModal">
                Add New <i class="fas fa-user-plus fa-fw ml-2"></i>
              </button>
            </div>
          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Registered at</th>
                  <th>Modify</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users.data" :key="user.id">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.type | uppercase }}</td>
                  <td>{{ user.created_at | Tdate }}</td>
                  <td>
                    <a href="#" @click="editModal(user)"
                      >Edit <i class="fa fa-edit text-blue"></i
                    ></a>
                    /
                    <a href="#" @click="deleteUser(user.id)"
                      >Delete <i class="fa fa-trash text-red"></i
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
          <div class="card-footer">
            <pagination
              :data="users"
              @pagination-change-page="getResults"
            ></pagination>
          </div>
        </div>
        <!-- /.card -->
      </div>
    </div>

    <div v-if="!$gate.isAdminOrAuthor()">
      <not-found></not-found>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="addNew"
      tabindex="-1"
      aria-labelledby="addNewLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-show="!editMode" class="modal-title" id="addNewLabel">
              Add User
            </h5>
            <h5 v-show="editMode" class="modal-title" id="addNewLabel">
              Edit User
            </h5>
            <button
              type="button"
              class="btn-close"
              data-dismiss="modal"
              aria-label="Close"
            >
              x
            </button>
          </div>

          <form @submit.prevent="editMode ? updateUser() : createUser()">
            <div class="modal-body">
              <div class="form-group">
                <label>Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  name="name"
                  placeholder="name"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('name') }"
                />
                <has-error :form="form" field="name"></has-error>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  placeholder="email"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('email') }"
                />
                <has-error :form="form" field="email"></has-error>
              </div>
              <div class="form-group">
                <label>Bio</label>
                <textarea
                  v-model="form.bio"
                  name="bio"
                  placeholder="Short bio for user (Optional)"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('bio') }"
                />
                <has-error :form="form" field="bio"></has-error>
              </div>
              <div class="form-group">
                <label>Type</label>
                <select
                  v-model="form.type"
                  type="type"
                  name="type"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('type') }"
                >
                  <option value="">Select user role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="author">Author</option>
                </select>
                <has-error :form="form" field="type"></has-error>
              </div>
              <div class="form-group">
                <label>Password</label>
                <input
                  v-model="form.password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  class="form-control"
                  :class="{ 'is-invalid': form.errors.has('password') }"
                />
                <has-error :form="form" field="password"></has-error>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Close
              </button>
              <button v-show="editMode" type="submit" class="btn btn-success">
                Update
              </button>
              <button v-show="!editMode" type="submit" class="btn btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Form from "vform";

export default {
  data() {
    return {
      editMode: false,
      users: {},
      form: new Form({
        id: "",
        name: "",
        email: "",
        password: "",
        type: "",
        bio: "",
        photo: "",
      }),
    };
  },
  methods: {
    getResults(page = 1) {
      axios.get("api/user?page=" + page).then((response) => {
        this.users = response.data;
      });
    },
    updateUser() {
      // console.log("editing data");
      this.$Progress.start();
      this.form
        .put("api/user/" + this.form.id)
        .then(() => {
          //sucessful
          $("#addNew").modal("hide");
          swal.fire("Updated!", "Information has been updated.", "success");
          this.$Progress.finish();
          Fire.$emit("AfterCreated");
        })
        .catch(() => {
          this.$Progress.fail();
        });
    },
    editModal(user) {
      this.editMode = true;
      this.form.reset();
      $("#addNew").modal("show");
      this.form.fill(user);
    },
    newModal() {
      this.form.reset();
      $("#addNew").modal("show");
    },
    deleteUser(id) {
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          // Send request to the server
          if (result.value) {
            this.form
              .delete("api/user/" + id)
              .then((result) => {
                swal.fire("Deleted!", "Your file has been deleted.", "success");
                Fire.$emit("AfterCreated");
              })
              .catch(() => {
                swal.fire("Failed!", "There was something wrong", "warning");
              });
          }
        });
    },
    loadUsers() {
      if (this.$gate.isAdminOrAuthor) {
        axios.get("api/user").then(({ data }) => (this.users = data));
      }
    },
    createUser() {
      this.$Progress.start();
      this.form
        .post("api/user")
        .then(() => {
          Fire.$emit("AfterCreated");

          $("#addNew").modal("hide");
          toast.fire({
            icon: "success",
            title: "User created successfully",
          });

          this.$Progress.finish();
        })
        .catch(() => {});
    },
  },
  created() {
    Fire.$on('searching',()=>{
      let query = this.$parent.search;
      axios.get('api/findUser?q='+query)
      .then((data) => {
        this.users= data.data
      })
      .catch(() => {

      });
    });
    this.loadUsers();
    Fire.$on("AfterCreated", () => this.loadUsers());
    // setInterval(()=>this.loadUsers(),3000);
  },
};
</script>
