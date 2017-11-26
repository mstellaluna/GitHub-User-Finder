$(document).ready(function() {
  $("#searchUser").on("keyup", function(e) {
    let userName = e.target.value;

    $.ajax({
      url: "https://api.github.com/users/"+ userName,
      data: {
        client_id: "6544789a257d5a42e814",
        client_secret: "90b24dfe52d7ff448735de7cbfa5eb3157195201"
      }
    }).done(function(user){
        $.ajax({
            url: "https://api.github.com/users/"+ userName +'/repos',
            data: {
                client_id: "6544789a257d5a42e814",
                client_secret: "90b24dfe52d7ff448735de7cbfa5eb3157195201"
              }
        }).done(function(repos){
            $.each(repos, function(index,repo){
                $('#repos').append(`
                <div class="well">
                <div class="row">
                <div class="col-md-7">
                <strong>${repo.name}: </strong> ${repo.description || 'Not Available' }
                </div> 
                <div class="col-md-3">
                <span class="label label-warning">Forks: ${repo.forks_count}</span>
                <span class="label label-primary">Watchers: ${repo.watchers_count}</span>
                <span class="label label-success">Stars: ${repo.stargazers_count}</span>         
                </div> 
                <div class="col-md-2">
                <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                </div> 
                </div>
                </div>
                `);
            });
        });
        
      $("#profile").html(`
         <div class="panel panel-default">
         <div class="panel-heading">
           <h3 class="panel-title">${user.name || 'Not Available'}</h3>
         </div>
         <div class="panel-body">
          <div class="row">
           <div class="col-md-3">
           <img class="thumbnail avatar" style="width: 100%;" src="${user.avatar_url || 'Not Available' }">
           <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url || 'Not Available'}">View Profile</a>
           </div>
           <div class="col-md-9">
           <span class="label label-default"><strong>Public Repos:</strong> ${user.public_repos}</span>
           <span class="label label-info"><strong>Public Gists:</strong> ${user.public_gists}</span>
           <span class="label label-success"><strong>Followers:</strong> ${user.followers}</span>
           <span class="label label-danger"><strong>Following:</strong> ${user.following}</span>
           <br><br>
           <ul class="list-group">
           <li class="list-group-item"><strong>Company:</strong> ${user.company || 'Not Available'}</li>
           <li class="list-group-item"><strong>Hireable:</strong> ${user.hireable || 'Not Available'}</li>
           <li class="list-group-item"><strong>Website/Blog:</strong> ${user.blog || 'Not Available'}</li>
           <li class="list-group-item"><strong>Location:</strong> ${user.location || 'Not Available'}</li>
           <li class="list-group-item"><strong>Member Since:</strong> ${user.created_at || 'Not Available'}</li>
           </ul>
           <br>
           <span>${user.bio || 'Not Available'}</span>
           </div>
          </div>
         </div>
       </div>
       <h3  class="page-header"><strong>Latest Repos: </strong></h3>
       <div id="repos"></div>         
         `);
    });
  });
});
