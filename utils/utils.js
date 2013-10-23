// for youtube only
exports.parseLink =  function(link){
    return link.replace(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, 'http://www.youtube.com/embed/$1');
}

exports.validateVidLink = function (link){
  var result;
  result = true;
  if ((link === null) || (link === undefined) || (link === ''))
  {

    return false;
  }

//  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
//  result = (link.match(p)) ? true : false;

  return result;
}


/**
 *
 * Create the endDate of course by adding duration days into start date.
 *
 */
exports.createEndDate = function(startDate,duration){
    var a = new Date();
    if (startDate === null){
      startDate = new Date();
    }
    a.setTime(startDate.getTime() + ((1000 * 60 * 60 * 24) * (duration-1)))
    return a;
}

