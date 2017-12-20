class PagesController < ApplicationController
  
  def home
    #meta gem -seo - generate metacontent
    @page_title = 'Personal Trainer in Düsseldorf by Attila Gyömrei'
    @page_description = 'My name is Attila Gyömrei. I&#39;m a mixed mover,
personal trainer, massage therapist and a genuine waterman
from Hungary. Currently living in Düsseldorf sharing my
practice and love for Budokon. Thank you for taking the time
to visit my website. Below you can find more information
about my practice and work.'
    set_meta_tags(
        title: @page_title,
        description: @page_description,
    )
    
    set_meta_tags og: {
        title: @page_title,
        type:     'website',
        url:  'http://www.attilapt.com',
        image:    'http://www.attilapt.com/images/meta/home_mini.jpg',
        description: @page_description,
    }
  end
  
  def budokon
    #meta gem -seo - generate metacontent
    @page_title = 'What is Budokon – Mixed Movement Arts in Düsseldorf'
    @page_description = 'The name Budokon was created by its founder, Kancho
Cameron Shayne. It was taken from the Japanese language:
Bu (meaning warrior), Do (meaning the way), Kon (meaning
the spirit or soul). This translates as “the way of the warrior
spirit”. This name was chosen to represent a person living the
WAY of the betterment of all humanity achieved through the
SPIRIT of unwavering virtue and defended by the
WARRIOR&#39;s service, protection, and courage.'
    set_meta_tags(
        title: @page_title,
        description: @page_description,
    )
    
    set_meta_tags og: {
        title: @page_title,
        type:     'website',
        url:  'http://www.attilapt.com',
        image:    'http://www.attilapt.com/images/meta/budokon_mini.jpg',
        description: @page_description,
    }
  end

  def attila
    #meta gem -seo - generate metacontent
    @page_title = 'Personal Trainer and Masseur in Düsseldorf'
    @page_description = 'I’m Attila, a qualified coach, personal trainer,
massage therapist, mixed mover and a genuine waterman
from Hungary, focusing all my efforts to help people succeed
and learn the processes necessary to make movement &amp;
healthy eating a solid part of their daily routine and lifestyle.'
    set_meta_tags(
        title: @page_title,
        description: @page_description,
    )
    
    set_meta_tags og: {
        title: @page_title,
        type:     'website',
        url:  'http://www.attilapt.com',
        image:    'http://www.attilapt.com/images/meta/attila_mini.jpg',
        description: @page_description,
    }
  end

  def services
    #meta gem -seo - generate metacontent
    @page_title = 'Personal Training – Massage – Nutrition Coaching'
    @page_description = 'What does living well mean to you?  For me, living
well is about allowing our bodies to be the creative, active and
powerful animals they were designed to be.  Let me show you

how to engage in a lifestyle that supports health and
wellbeing by showing you the tools, techniques and exercises
I have learnt over many years of personal study, ones I
believe have transformed my life and will do yours. Whether
you require weight loss, to build strength or learn about
creating a healthier lifestyle, these are all common services
people come to me for and receive the results they were
looking for. To find out more about each of these services,
just click on the links below. I combine these services to
create the right program for you and are constantly reviewing
how I work with you as you develop and meet your goals.'
    set_meta_tags(
        title: @page_title,
        description: @page_description,
    )
    
    set_meta_tags og: {
        title: @page_title,
        type:     'website',
        url:  'http://www.attilapt.com',
        image:    'http://www.attilapt.com/images/meta/services_mini.jpg',
        description: @page_description,
    }
  end

  def schedule
    #meta gem -seo - generate metacontent
    @page_title = 'Düsseldorf - Fitness Studio – Classes'
    @page_description = 'Currently I am teaching Budokon and Fitness
classes at Agoge Athletic Club in Heerdt, Rundum Yoga in
Unterbilk, and in Karmakarma Studio as well as private
classes (check out &quot;services&quot; for more info) and workshops
international (more info at “events” page).'
    set_meta_tags(
        title: @page_title,
        description: @page_description,
    )
    
    set_meta_tags og: {
        title: @page_title,
        type:     'website',
        url:  'http://www.attilapt.com',
        image:    'http://www.attilapt.com/images/meta/schedule_mini.jpg',
        description: @page_description,
    }
  end

  def contact
    #meta gem -seo - generate metacontent
    @page_title = 'Let’s have a chat with Attila – Contact information'
    @page_description = 'Please feel free to reach out to me if you have any
questions or comments about the services I offer. Also, you
could always just send me a friendly hello.'
    set_meta_tags(
        title: @page_title,
        description: @page_description,
    )
    
    set_meta_tags og: {
        title: @page_title,
        type:     'website',
        url:  'http://www.attilapt.com',
        image:    'http://www.attilapt.com/images/meta/contact_mini.jpg',
        description: @page_description,
    }
  end

  def events
    #meta gem -seo - generate metacontent
    @page_title = 'Workshops in Düsseldorf by Attila Gyömrei'
    @page_description = 'Do you want to learn something new? Give yourself
this unique opportunity to move, grow, play and learn with an
epic bunch of people. Find out where I will be next or request
me to come and teach at your studio.'
    set_meta_tags(
        title: @page_title,
        description: @page_description,
    )
    
    set_meta_tags og: {
        title: @page_title,
        type:     'website',
        url:  'http://www.attilapt.com',
        image:    'http://www.attilapt.com/images/meta/events_mini.jpg',
        description: @page_description,
    }
  end
  
  def event
  end
  
 #services
  def oneonone
    #meta gem -seo - generate metacontent
    @page_title = ''
    @page_description = ''
    set_meta_tags(
        title: @page_title,
        description: @page_description,
    )
    
    set_meta_tags og: {
        title: @page_title,
        type:     'website',
        url:  'http://www.attilapt.com',
        image:    'http://www.attilapt.com/images/meta/oneonone_mini.jpg',
        description: @page_description,
    }
  end

  def massage
  #meta gem -seo - generate metacontent
    @page_title = ''
    @page_description = ''
    set_meta_tags(
        title: @page_title,
        description: @page_description,
    )
    
    set_meta_tags og: {
        title: @page_title,
        type:     'website',
        url:  'http://www.attilapt.com',
        image:    'http://www.attilapt.com/images/meta/massage_mini.jpg',
        description: @page_description,
    }
  end 

  def group
  #meta gem -seo - generate metacontent
    @page_title = ''
    @page_description = ''
    set_meta_tags(
        title: @page_title,
        description: @page_description,
    )
    
    set_meta_tags og: {
        title: @page_title,
        type:     'website',
        url:  'http://www.attilapt.com',
        image:    'http://www.attilapt.com/images/meta/grouptr_mini.jpg',
        description: @page_description,
    }
  end

end
