import Video from '../../model/video-model.mjs';
// import moment from 'moment';
// import * as auth from '../../services/auth-service';

// @EmmanuelCruz TODO: Explicitar mensajes de error, por ejemplo: res.json({message: error})
// y mensajes exitosos, por ejemplo: res.json({message: 'Operación exitosa'})
// Traducir mensajes de res y documentación al español

export function index(req, res){
  // Find all videos
  Video.find({}, (error, videos) => {
    if(error){
      return res.status(500).json();
    }
    return res.status(200).json({videos: videos});
  })
  .sort({createdAt: -1});
}

export function create(req, res){
  // Create video
//   const id = auth.getUserId(req);
  Video.findOne({_id: id}, (error, user) => {
    if(error && !user){
      return res.status(500).json();
    }
    const video = new Video(req.body.video);
    // video.author = user._id;

    video.save(error => {
      if(error){
        return res.status(500).json();
      }
      return res.status(201).json({id: video._id});
    });
  });
}

export function update(req, res){
  // Update a video
//   const id = auth.getUserId(req);

  User.findOne({_id: id}, (error, user) => {
    if(error){
      return res.status(500).json();
    }
    if(!user){
      return res.status(404).json();
    }

    const video = new Video(req.body.video);
    // video.author = user._id;
    Video.findByIdAndUpdate({_id: video._id}, video, error => {
      if(error){
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

export function remove(req, res){
  // Delete a video
//   const id = auth.getUserId(req);
  Video.findOne({_id: req.params.id}, (error, video) => {
    if(error){
      return res.status(500).json();
    }
    if(!video){
      return res.status(404).json();
    }
    // if(video.author._id.toString() !== id){
    //   return res.status(403).json({message: 'Not allowed to delete another user\'s video'});
    // }
    Video.deleteOne({_id: req.params.id}, error => {
      if(error){
        return res.status(500).json();
      }
      return res.status(204).json();
    });
  });
}

export function show(req, res){
  // Get video from id
  Video.findOne({_id: req.params.id}, (error, video) => {
    if(error){
      return res.status(500).json();
    }
    if(!video){
      return res.status(400).json();
    }
    return res.status(200).json({video: video});
  })
}
